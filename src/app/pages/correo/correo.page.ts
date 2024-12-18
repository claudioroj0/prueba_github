import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [  
      CommonModule
    , FormsModule 
    , TranslateModule
    , IonicModule
      ]
})
export class CorreoPage implements OnInit {
  email: string;
  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private toastController: ToastController
  ) {   
    this.email = '';
  }

  async validateEmail() {
    const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.router.navigate(['/incorrecto']);
      return;
    }

    const user = await this.databaseService.findUserByEmail(this.email);
    if (user) {
      this.router.navigate(['/pregunta'], { queryParams: { email: this.email } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  navegarIngreso() {
    this.router.navigate(['/login']);
  }

  

  ngOnInit() {
  }

  // public ingresarPaginaValidarRespuestaSecreta(): void {
  //   const usuario = new Usuario();
  //   const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
  //   if (!usuarioEncontrado) {
  //     this.router.navigate(['/incorrecto']);
  //   }
  //   else {
  //     const navigationExtras: NavigationExtras = {
  //       state: {
  //         usuario: usuarioEncontrado
  //       }
  //     };
  //     this.router.navigate(['/pregunta'], navigationExtras);
  //   }
  // }

  //verificarCorreo(){
    //const usuario = this.databaseService.findUserByEmail(this.correo)
  //} 
  

}
