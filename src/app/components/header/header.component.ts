import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
  ]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @Output() headerClick = new EventEmitter<string>();
  isAdmin: boolean = false; // Estado para verificar si el usuario es administrador

  constructor(private navCtrl: NavController, private authService: AuthService,private alertController: AlertController,
    private animationController: AnimationController) 
  { 
    addIcons({ logOutOutline, qrCodeOutline });
    
  }

  async ngOnInit() {
    try {
      // Verifica si el usuario actual es administrador
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser && currentUser.userName === 'admin') {
        this.isAdmin = true;
      }
    } catch (error) {
      console.error('Error al verificar si es admin:', error);
    }
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    
  }

  sendClickEvent(buttonName: string) {
    this.headerClick.emit(buttonName);
  }

  logout() {
    this.authService.logout();
  }


  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1)
      .play();
  }


}
