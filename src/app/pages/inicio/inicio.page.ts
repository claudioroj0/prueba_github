import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/app/services/auth.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { Capacitor } from '@capacitor/core';
import { Asistencia } from 'src/app/model/asistencia';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UsuariosComponent } from "../../components/usuarios/usuarios.component";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
    standalone: true,
    imports: [ IonContent, CommonModule, FormsModule,
        MisdatosComponent, MiclaseComponent, ForoComponent, CodigoqrComponent, WelcomeComponent,
        HeaderComponent, FooterComponent, WelcomeComponent, UsuariosComponent]
})
export class InicioPage  {
  

  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';
  
  constructor(
    private auth: AuthService,
    private scanner: ScannerService
  )
  {}

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  async headerClick(button: string) {

    if (button === 'scan' && Capacitor.getPlatform() === 'web'){
      this.selectedComponent = 'codigoqr';
      return;
    }

    if (button === 'scan' && Capacitor.getPlatform() !== 'web'){
        this.mostrarMiclaseComponent(await this.scanner.scan());
        this.selectedComponent = 'miclase';
        return;
    }
    
     
      this.selectedComponent = button;
    
  }

  webQrScanned(qr: string) {
    this.mostrarMiclaseComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  mostrarMiclaseComponent(qr: string) {

    if (Asistencia.isValidAsistenciaQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('miclase');
      return;
    }
    
    this.changeComponent('welcome');
  }

  footerClick(button: string) {
    this.selectedComponent = button;
  }

  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;
  }

  logout() {
    this.auth.logout();
  }
}
