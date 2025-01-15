import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetasEmpleadoPage } from './recetas-empleado.page';

describe('RecetasEmpleadoPage', () => {
  let component: RecetasEmpleadoPage;
  let fixture: ComponentFixture<RecetasEmpleadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasEmpleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
