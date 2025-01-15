import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosMedicosPage } from './servicios-medicos.page';

describe('ServiciosMedicosPage', () => {
  let component: ServiciosMedicosPage;
  let fixture: ComponentFixture<ServiciosMedicosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosMedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
