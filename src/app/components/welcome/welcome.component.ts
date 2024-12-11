import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importamos el Router
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { IonButton, IonIcon, IonContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, TranslateModule,CommonModule]
})
export class WelcomeComponent implements OnInit {

  user: User = new User();
  isAdmin: boolean = false; // Nueva variable para identificar si es administrador

  constructor(private auth: AuthService, private router: Router) {
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;

        // Verificar si el usuario es administrador
        this.isAdmin = user.userName === 'admin';
      }
    });
  }

  ngOnInit() {}

  // Método que navega a la página del escaneo de QR
  goToCodigoQr() {
    this.router.navigate(['/codigoqr']); // Esta es la ruta configurada en app-routing.module.ts
  }
}
