import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreguntaPage } from './pregunta.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { Routes } from '@angular/router';
import { CorreoPage } from '../correo/correo.page';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';

// Definir las rutas necesarias para las pruebas
const routes: Routes = [
  { path: 'correo', component: CorreoPage },
  { path: '**', redirectTo: '/correo' },
];

// Mock de DatabaseService
class MockDatabaseService {
  findUserByEmail(email: string) {
    // Simular un usuario encontrado o no encontrado
    if (email === 'test@domain.com') {
      return of({ email: 'test@domain.com', userName: 'testUser' });
    } else {
      return of(null); // Simula que no encontró el usuario
    }
  }
}

describe('PreguntaPage', () => {
  let component: PreguntaPage;
  let fixture: ComponentFixture<PreguntaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot(),
        IonicStorageModule.forRoot(),
        PreguntaPage
      ],
      providers: [
        AuthService,
        { provide: DatabaseService, useClass: MockDatabaseService }, // Proveer el mock del servicio
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the PreguntaPage', () => {
    expect(component).toBeTruthy();
  });
});
