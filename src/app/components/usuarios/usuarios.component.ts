import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa para ngIf y ngFor
import { IonCard, IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonList, IonFabButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { BehaviorSubject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { trash, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [IonFabButton, 
    CommonModule, 
    IonCard, 
    IonContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonIcon,
    IonList,
    TranslateModule
  ]
})
export class UsuariosComponent implements OnInit {
  authUser?: User; // Usuario autenticado
  userList: User[] = []; // Lista de usuarios

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService,
    private alertController: AlertController
  ) {addIcons({trashOutline})}

  async ngOnInit() {
  // Subscribirse al usuario autenticado
  this.authService.authUser.subscribe((user) => {
    this.authUser = user ?? undefined; // Convertir null en undefined
  });

  // Si el usuario autenticado es admin, cargar los usuarios
  if (this.authUser?.userName === 'admin') {
    await this.loadUsers();
  }
}

  // Cargar la lista de usuarios desde la base de datos
  async loadUsers() {
    this.userList = await this.dbService.readUsers();
  }

  // Eliminar un usuario
  async deleteUser(userName: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario "${userName}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const success = await this.dbService.deleteByUserName(userName);
            if (success) {
              await this.loadUsers();
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo eliminar al usuario. Intente nuevamente.',
                buttons: ['Aceptar']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
