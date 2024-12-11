import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonContent } from "@ionic/angular/standalone";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports:[IonContent,IonButton,CommonModule, TranslateModule         // CGV-Permite usar pipe 'translate'
    ]
})
export class MiclaseComponent  implements OnDestroy {

  asistencia: any;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.qrCodeData.subscribe((qr) => {
      this.asistencia = qr? JSON.parse(qr): null;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
