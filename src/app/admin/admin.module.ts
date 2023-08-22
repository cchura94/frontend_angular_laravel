import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CoreModule } from '../core/core.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
