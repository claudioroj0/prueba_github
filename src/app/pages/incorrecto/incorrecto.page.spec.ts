import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IncorrectoPage } from './incorrecto.page';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

describe('IncorrectoPage', () => {
  let component: IncorrectoPage;
  let fixture: ComponentFixture<IncorrectoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [TranslateService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectoPage);
    component = fixture.componentInstance;
  });

  // Usar fakeAsync y tick para simular el paso del tiempo
  it('should create', fakeAsync(() => {
    fixture.detectChanges(); // Detecta cambios asincrónicos
    tick(); // Simula el paso del tiempo para tareas asincrónicas
    expect(component).toBeTruthy();
  }));

  // O puedes aumentar el tiempo de espera si el problema persiste
  it('should create ', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // Aumentar el tiempo de espera a 10 segundos
    fixture.detectChanges();
    setTimeout(() => {
      expect(component).toBeTruthy();
      done(); // Llamar a done() cuando la prueba esté completa
    }, 3000); // Asegúrate de que las operaciones se completen dentro de este tiempo
  });
});
