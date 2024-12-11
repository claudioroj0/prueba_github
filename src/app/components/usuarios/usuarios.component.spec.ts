import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UsuariosComponent } from './usuarios.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Importa el módulo y servicio de traducción
import { AuthService } from 'src/app/services/auth.service'; // Importa el AuthService si es necesario
import { Storage } from '@ionic/storage-angular'; // Importa Storage si es necesario

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(), // Configura el módulo de traducción
        UsuariosComponent // Asegúrate de importar el componente standalone
      ],
      providers: [
        {
          provide: Storage, // Proveedor para Storage
          useValue: {
            // Mock básico del servicio Storage
            get: jasmine.createSpy('get'),
            set: jasmine.createSpy('set'),
            remove: jasmine.createSpy('remove'),
            clear: jasmine.createSpy('clear')
          }
        },
        TranslateService, // Asegúrate de proveer TranslateService
        AuthService // Proporciona el AuthService si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
