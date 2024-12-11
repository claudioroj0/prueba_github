import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageComponent } from "../../components/language/language.component";
import { colorWandOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TranslateService } from '@ngx-translate/core';
import { ViewWillEnter } from '@ionic/angular';
import { IonHeader, IonToolbar, IonIcon, IonButton, IonContent, IonCard, IonCardContent, IonCardHeader, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonItem, IonCardHeader, IonCardContent, IonCard, IonContent, IonButton, IonIcon, IonToolbar, IonHeader, 
    FormsModule, // Necesario para el ngModel en el formulario
    LanguageComponent, // Necesario si el componente LanguageComponent está en la plantilla
  ]
})
export class IngresoPage implements ViewWillEnter {
  
  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  correo: string = 'atorres';
  password: string = '1234';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService
  ) { 
    // Agregar los iconos necesarios
    addIcons({ colorWandOutline });
  }

  async ionViewWillEnter() {
    if (this.selectLanguage) {
      this.selectLanguage.setCurrentLanguage();
    }
  }

  iniciarSesion() {
    this.authService.login(this.correo, this.password);
  }

  ingresarPaginaValidarCorreo() {
    this.router.navigate(['/correo']);
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  ingresarPaginaMapa() {
    this.router.navigate(['/map']);
  }
}
