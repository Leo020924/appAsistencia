import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasEmpleadoPage } from './recetas-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasEmpleadoPageRoutingModule {}
