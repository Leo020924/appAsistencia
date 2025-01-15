import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosMedicosPageRoutingModule } from './servicios-medicos-routing.module';

import { ServiciosMedicosPage } from './servicios-medicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosMedicosPageRoutingModule
  ],
  declarations: [ServiciosMedicosPage]
})
export class ServiciosMedicosPageModule {}
