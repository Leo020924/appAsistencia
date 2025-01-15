import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasEmpleadoPageRoutingModule } from './recetas-empleado-routing.module';

import { RecetasEmpleadoPage } from './recetas-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasEmpleadoPageRoutingModule
  ],
  declarations: [RecetasEmpleadoPage]
})
export class RecetasEmpleadoPageModule {}
