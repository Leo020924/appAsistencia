import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'citas-empleado',
    loadChildren: () => import('./pages/servicios-medicos/citas-empleado/citas-empleado.module').then( m => m.CitasEmpleadoPageModule)
  },  {
    path: 'recetas-empleado',
    loadChildren: () => import('./pages/servicios-medicos/recetas-empleado/recetas-empleado.module').then( m => m.RecetasEmpleadoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'servicios-medicos',
    loadChildren: () => import('./pages/servicios-medicos/servicios-medicos.module').then( m => m.ServiciosMedicosPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
