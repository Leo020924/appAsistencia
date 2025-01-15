import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'citas-empleado',
        loadChildren: () =>
          import('../pages/servicios-medicos/citas-empleado/citas-empleado.module').then(
            (m) => m.CitasEmpleadoPageModule
          ),
      },
      {
        path: 'recetas-empleado',
        loadChildren: () =>
          import('../pages/servicios-medicos/recetas-empleado/recetas-empleado.module').then(
            (m) => m.RecetasEmpleadoPageModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../pages/perfil/perfil.module').then(
            (m) => m.PerfilPageModule
          ),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('../pages/servicios-medicos/servicios-medicos.module').then(
            (m) => m.ServiciosMedicosPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
  /* {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
