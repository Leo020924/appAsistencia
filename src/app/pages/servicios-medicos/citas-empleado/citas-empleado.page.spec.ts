import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasEmpleadoPage } from './citas-empleado.page';

describe('CitasEmpleadoPage', () => {
  let component: CitasEmpleadoPage;
  let fixture: ComponentFixture<CitasEmpleadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasEmpleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
