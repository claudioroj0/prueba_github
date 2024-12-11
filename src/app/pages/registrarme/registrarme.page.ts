import { IonCardContent, IonCardHeader, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonCol, IonCard, IonIcon } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonContent,
      CommonModule, FormsModule,
      IonCard, IonButton, IonItem, TranslateModule, IonInput, IonSelect, IonSelectOption, DatePickerComponent, IonIcon]
})
export class RegistrarmePage implements OnInit {

  registro: User = new User();

  confirmarPassword: string = '';
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private dataBaseService: DatabaseService,
    private router:Router
  ) { }

  ngOnInit() { }

  async registrarUsuario() {

      // Validar que las contraseñas coincidan
      if (this.registro.password !== this.confirmarPassword) {
        showToast('Las contraseñas no coinciden');
        return;
      }
  
      // Validar campos obligatorios
      if (!this.registro.userName || !this.registro.firstName || !this.registro.lastName || 
          !this.registro.email || !this.registro.password || !this.registro.educationalLevel) {
        showToast('Por favor, complete todos los campos obligatorios');
        return;
      }
  
      // Guardar Usuario en la base de datos
      this.dataBaseService.saveUser(this.registro).then(()=>{
        this.authService.login(this.registro.userName, this.registro.password)
      }).catch(()=>{
        showToast('No fue posible crear el usuario, por favor intente más tarde');
      })


  }

    public actualizarNivelEducacional(event: any) {
    // debugger
    // this.usuario.educationalLevel 
    //   = EducationalLevel.findLevel(event.detail.value)!;
  }

  onFechaNacimientoChange(event: any) {
    //this.usuario.dateOfBirth = new Date(event.detail.value); // Convertir de ISO a Date
  }

  navegarIngreso() {
    this.router.navigate(['/login']);
  }

}
