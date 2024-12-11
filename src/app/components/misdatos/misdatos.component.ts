import { IonCardContent, IonCardHeader, IonLabel, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonCol, IonCard } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports : [IonButton, IonInput, IonContent
    , CommonModule, FormsModule, IonItem, IonSelect, IonSelectOption, TranslateModule, DatePickerComponent,IonCard,IonCardHeader ]
})
export class MisdatosComponent  implements OnInit {

  usuario: User = new User();
  usuarios: User[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();
  tempDate: string;
  constructor(
    private bd: DatabaseService,
    private auth: AuthService,
    private api: APIClientService) 
    
  { 
    
    this.bd.userList.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
    this.auth.readAuthUser().then((usuario) => {
      if (usuario) {
        // alert('en constructor: '+this.usuario.educationalLevel.id);
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
    this.tempDate = this.usuario.dateOfBirth? this.usuario.dateOfBirth.toISOString():'';
  }

  ngOnInit() {
    
  }

  actualizarUsuario() {
    const name = this.usuario.firstName.trim();
    const email = this.usuario.email.trim();
    
    // Validar si el nombre está vacío
    if (name === '') {
      showToast('El usuario debe tener un nombre');
      return;
    }
  
    // Validar si el nombre contiene solo números
    if (/^\d+$/.test(name)) {
      showToast('El nombre no puede ser solo numérico');
      return;
    }
  
    // Validar si el nombre contiene caracteres repetidos excesivamente
    if (/^(.)\1{4,}$/.test(name)) { // 5 o más caracteres iguales consecutivos
      showToast('El nombre no puede tener demasiados caracteres repetidos');
      return;
    }
  
    // Validar si el nombre contiene caracteres no válidos
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
      showToast('El nombre solo puede contener letras y espacios');
      return;
    }

      // Validar si el correo está vacío
    if (email === '') {
      showToast('El correo no puede estar vacío');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showToast('El correo no tiene un formato válido');
      return;
    }
  
    // Si pasa las validaciones, guardar el usuario
    console.log(this.usuario);
    this.bd.saveUser(this.usuario);
    this.auth.saveAuthUser(this.usuario);
    showToast('El usuario fue guardado correctamente');
  }

  public actualizarNivelEducacional(event: any) {
    // debugger
    // this.usuario.educationalLevel 
    //   = EducationalLevel.findLevel(event.detail.value)!;
  }

  onFechaNacimientoChange(event: any) {
    //this.usuario.dateOfBirth = new Date(event.detail.value); // Convertir de ISO a Date
  }

  

}
