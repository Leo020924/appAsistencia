import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasEmpleadoPageRoutingModule } from './citas-empleado-routing.module';

import { CitasEmpleadoPage } from './citas-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasEmpleadoPageRoutingModule
  ],
  declarations: [CitasEmpleadoPage]
})
export class CitasEmpleadoPageModule {}
