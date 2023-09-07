import { Component } from '@angular/core';
import { PedidoService } from 'src/app/core/services/pedido.service';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.scss']
})
export class ListaPedidoComponent {

  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService){
    this.listaPedidos()
  }

  listaPedidos(){
    this.pedidoService.listar().subscribe(
      (res:any) => {
        this.pedidos = res.data
      }
    )
  }

}
