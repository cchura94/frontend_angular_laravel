import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { AuthService } from './services/auth.service';
import { PedidoInterceptor } from '../interceptors/pedido.interceptor';
import { UsuarioService } from './services/usuario.service';
import { CategoriaService } from './services/categoria.service';
import { ProductoService } from './services/producto.service';
import { ClienteService } from './services/cliente.service';
import { PedidoService } from './services/pedido.service';


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
    UsuarioService,
    CategoriaService,
    ProductoService,
    ClienteService,
    PedidoService
  ]
})
export class CoreModule { }
