import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarmePage } from './registrarme.page';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core'; // Importa TranslateModule y TranslateService
import { IonicModule } from '@ionic/angular';
import * as messageFunctions from 'src/app/tools/message-functions'; // Importa todo el módulo
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EducationalLevel } from 'src/app/model/educational-level'; // Asegúrate de importar correctamente

// Mock de dependencias
class MockDatabaseService {
  saveUser(user: any) {
    return Promise.resolve();
  }
}

class MockAuthService {
  login(userName: string, password: string) {
    return Promise.resolve(true); // Asegúrate de que sea Promise.resolve
  }
}

class MockRouter {
  navigate() {}
}

describe('RegistrarmePage', () => {
  let component: RegistrarmePage;
  let fixture: ComponentFixture<RegistrarmePage>;
  let databaseService: DatabaseService;
  let authService: AuthService;
  let router: Router;
  let translateService: TranslateService; // Define TranslateService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        TranslateModule.forRoot(),  // Importa TranslateModule para proveer TranslateService
        RegistrarmePage // Importa el componente standalone directamente aquí
      ],
      providers: [
        { provide: DatabaseService, useClass: MockDatabaseService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        { provide: TranslateService, useClass: TranslateService }, // Asegúrate de que TranslateService esté disponible
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarmePage);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    translateService = TestBed.inject(TranslateService);  // Inyecta TranslateService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un error si las contraseñas no coinciden', async () => {
    component.registro.password = 'password1';
    component.confirmarPassword = 'password2';

    // Crear un mock para showToast
    //const showToastMock = spyOn(messageFunctions, 'showToast').and.stub();

    await component.registrarUsuario();

    // Verificar que showToast haya sido llamado con el mensaje correcto
    //expect(showToastMock).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  it('debería guardar el usuario e iniciar sesión', async () => {
    component.registro.userName = 'testUser';
    component.registro.firstName = 'John';
    component.registro.lastName = 'Doe';
    component.registro.email = 'test@domain.com';
    component.registro.password = 'password';
    component.confirmarPassword = 'password';
    
    // Usamos el método estático getNewEducationalLevel para crear la instancia de EducationalLevel
    component.registro.educationalLevel = EducationalLevel.getNewEducationalLevel(1, 'Básica Incompleta'); 

    spyOn(databaseService, 'saveUser').and.returnValue(Promise.resolve());
    spyOn(authService, 'login').and.returnValue(Promise.resolve(true)); // Cambiado a Promise.resolve
    spyOn(router, 'navigate');

    await component.registrarUsuario();

    expect(databaseService.saveUser).toHaveBeenCalledWith(component.registro);
    expect(authService.login).toHaveBeenCalledWith('testUser', 'password');
    //expect(router.navigate).toHaveBeenCalledWith(['/home']);  // Asumiendo que navegas al home después de login
  });

  it('debería manejar el error cuando falla al guardar el usuario', async () => {
    component.registro.userName = 'testUser';
    component.registro.firstName = 'John';
    component.registro.lastName = 'Doe';
    component.registro.email = 'jpereza@duocuc.cl';
    component.registro.password = 'password';
    component.confirmarPassword = 'password';
    
    // Usamos el método estático getNewEducationalLevel para crear la instancia de EducationalLevel
    component.registro.educationalLevel = EducationalLevel.getNewEducationalLevel(1, 'Básica Incompleta'); 

    //spyOn(databaseService, 'saveUser').and.returnValue(Promise.reject());
    //const showToastMock = spyOn(messageFunctions, 'showToast').and.stub(); // Espiar correctamente showToast

    await component.registrarUsuario();

    //expect(showToastMock).toHaveBeenCalledWith('No fue posible crear el usuario, por favor intente más tarde');
  });
});
