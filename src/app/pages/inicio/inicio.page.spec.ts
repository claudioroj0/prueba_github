import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importar IonicStorageModule
import { Storage } from '@ionic/storage-angular'; // Importar Storage
import { of } from 'rxjs'; // Para mockear traducciones



describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let storage: Storage;

  // Mock para ngx-translate
  const mockTranslateLoader = {
    getTranslation: (lang: string) => of({ Welcome: { TituloSistema: 'Sistema de Asistencia DUOC' } }),
  };

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: mockTranslateLoader },
        }),
        RouterTestingModule,
        IonicStorageModule.forRoot(), // Inicializar Storage
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }, // Mock ActivatedRoute
        Storage, // Proveer Storage
        TranslateService,
      ],
    }).compileComponents();

    // Inicializar Storage
    storage = TestBed.inject(Storage);
    await storage.create();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the InicioPage', () => {
    expect(component).toBeTruthy();
  });

  
});
