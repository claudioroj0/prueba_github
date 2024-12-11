import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline,book, person,peopleCircleOutline,home } from 'ionicons/icons';
import { CodigoqrComponent } from '../codigoqr/codigoqr.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon,
  ]
})
export class FooterComponent implements OnInit {

  selectedButton = 'codigoqr';
  @Output() footerClick = new EventEmitter<string>();
  isAdmin: boolean = false;

  constructor(private dataBaseService: DatabaseService, private authService:AuthService) { 
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline,book,person,peopleCircleOutline,home });

  }

  async ngOnInit() {
    try {
      // Obtener el usuario actual desde el servicio AuthService
      const currentUser = await this.authService.getCurrentUser();

      // Verificar si el usuario logueado es el admin
      if (currentUser && currentUser.userName === 'admin') {
        this.isAdmin = true;
      }
    } catch (error) {
      console.error("Error al verificar si es admin", error);
    }
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

  

}
