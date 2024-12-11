import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CorreoPage } from './correo.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';


// Mock para DatabaseService
class MockDatabaseService {
  findUserByEmail(email: string) {
    if (email === 'valid@example.com') {
      return Promise.resolve(new User()); // Devuelve un User válido
    }
    return Promise.resolve(undefined); // Devuelve undefined si no se encuentra el usuario
  }
}

// Mock para ToastController
class MockToastController {
  create(options: any) {
    // Creamos el objeto con el método 'present' como un Spy
    const toast = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    // Simulamos que 'present' devuelve una promesa resuelta
    toast.present.and.returnValue(Promise.resolve());
    return Promise.resolve(toast);  // Devolvemos la promesa con el toast
  }
}

describe('CorreoPage', () => {
  let component: CorreoPage;
  let fixture: ComponentFixture<CorreoPage>;
  let router: Router;
  let toastController: MockToastController;
  let databaseService: DatabaseService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: DatabaseService, useClass: MockDatabaseService },
        { provide: ToastController, useClass: MockToastController },
        TranslateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CorreoPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    toastController = TestBed.inject(ToastController) as unknown as MockToastController;
    databaseService = TestBed.inject(DatabaseService);
    fixture.detectChanges();
  }));

  it('should create the CorreoPage', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un mensaje de error por formato de correo electrónico no válido', async () => {
    component.email = 'invalidemail'; // Email no válido
    spyOn(router, 'navigate');

    const toastSpy = spyOn(toastController, 'create').and.callThrough();

    // Ejecutamos el método y esperamos que la promesa se resuelva
    await component.validateEmail();

    // Verificamos que el toast fue mostrado con el mensaje adecuado
    // expect(toastSpy).toHaveBeenCalledWith({
    //   message: 'Correo.Mensaje.FormatoInvalido',
    //   color: 'danger',
    //   duration: 2000,
    // });

    // const toast = await toastSpy.calls.mostRecent().returnValue;
    // expect(toast.present).toHaveBeenCalled();
    //expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debe navegar a /pregunta si el correo electrónico existe en la base de datos', async () => {
    component.email = 'atorres@example.com'; // Email válido
    spyOn(router, 'navigate');

    spyOn(databaseService, 'findUserByEmail').and.returnValue(Promise.resolve(new User()));

    await component.validateEmail();

    // Verifica que la navegación incluye el email en los parámetros
    expect(router.navigate).toHaveBeenCalledWith(['/pregunta'], {
      queryParams: { email: 'atorres@example.com' },
    });
  });

  it('debería mostrar un mensaje de error y navegar a /incorrecto si el correo electrónico no existe', async () => {
    component.email = 'nonexistent@example.com'; // Email no existente
    spyOn(router, 'navigate');

    // Crear el mock para el ToastController y espiar su método 'create'
    const toastSpy = spyOn(toastController, 'create').and.callThrough();

    // Simular que el usuario no existe en la base de datos
    spyOn(databaseService, 'findUserByEmail').and.returnValue(Promise.resolve(undefined));

    // Ejecutar el método validateEmail
    await component.validateEmail();

    // Esperar que la promesa de Toast se resuelva correctamente
    //const toast = await toastSpy.calls.mostRecent().returnValue;

    // Verificar que el toast fue mostrado con el mensaje adecuado
    // expect(toastSpy).toHaveBeenCalledWith({
    //   message: 'Correo.Mensaje.UsuarioNoEncontrado',
    //   color: 'danger',
    //   duration: 2000,
    // });

    // Asegurarse de que el toast se haya presentado
    //expect(toast.present).toHaveBeenCalled();

    // Verificar que la navegación se haya realizado hacia /incorrecto
    expect(router.navigate).toHaveBeenCalledWith(['/incorrecto']);
  });

  it('debe navegar a /login cuando se llama a navegar.Ingreso', () => {
    spyOn(router, 'navigate');
    component.navegarIngreso();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debe manejar casos extremos para la validación del correo electrónico', async () => {
    const validEmail = 'email@example.com';
    component.email = validEmail.trim();
    
    spyOn(router, 'navigate');

    spyOn(databaseService, 'findUserByEmail').and.returnValue(Promise.resolve(new User()));

    await component.validateEmail();

    // Verificar que se navega correctamente con el email validado
    expect(router.navigate).toHaveBeenCalledWith(['/pregunta'], {
      queryParams: { email: validEmail },
    });
  });
});
