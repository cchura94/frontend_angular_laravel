import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { AuthService } from './services/auth.service';
import { PedidoInterceptor } from '../interceptors/pedido.interceptor';
import { UsuarioService } from './services/usuario.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PedidoInterceptor,
      multi: true
    },
    UsuarioService
  ]
})
export class CoreModule { }
