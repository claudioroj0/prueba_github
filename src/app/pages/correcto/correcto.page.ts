import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [ IonContent, IonToolbar, CommonModule,
    FormsModule, IonButton, IonIcon, TranslateModule]
})
export class CorrectoPage implements OnInit {
  password='';
  constructor( 
    private route: ActivatedRoute,
    private router:  Router

  ) 
  
  {addIcons({ arrowBack });
}
  navegarIngreso() {
    this.router.navigate(['/login']);
    }
    ngOnInit() {
      this.password = this.route.snapshot.queryParams['clave'];
    }
  }



