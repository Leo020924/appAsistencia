import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosMedicosPage } from './servicios-medicos.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosMedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosMedicosPageRoutingModule {}
