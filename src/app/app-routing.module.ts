import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpaginaComponent } from './layoutpagina/layoutpagina.component';
import { InicioComponent } from './inicio/inicio.component';
import { Error404Component } from './errors/error404/error404.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component:LayoutpaginaComponent,
    children: [
      {
        path: '',
        component: InicioComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'error-404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/error-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
