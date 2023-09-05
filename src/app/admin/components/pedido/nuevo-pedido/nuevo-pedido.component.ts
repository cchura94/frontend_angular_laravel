import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent {
  carrito:any[] = [];

  products: any[] = []
  totalRecords!: number;
  buscar = new FormControl('');
  loading: boolean = false;
  cliente_seleccionado: any = null

  cliente!: any;
  clienteDialog: boolean = false;
  submitted: boolean = false;

  buscar_clie = new FormControl('');
  clienteForm = new FormGroup({
      nombre_completo: new FormControl('', [Validators.required]),
      ci_nit: new FormControl(''),
      telefono: new FormControl('')
  });

  

  constructor(private productoService: ProductoService, private clienteService: ClienteService){

    this.listar()
  }

  loadProductos(event: LazyLoadEvent) {
    console.log(event);
    let page = (event.first/event.rows) + 1;
    console.log("PAGINA", page)
    
    this.listar(page, event.rows)
    // this.products = res.data.data;
    // this.totalRecords = res.data.totalRecords;
    
}

listar(page=1, limit=10){
  this.loading = true;
  this.productoService.listar(page, limit, this.buscar.value).subscribe(
    (res: any) => {
      this.products = res.data 
      this.totalRecords = res.total
      console.log(this.totalRecords)

      this.loading = false;
    }
  )

  // this.loading = false;

}

addCarrito(producto){
  this.carrito.push({id: producto.id, nombre: producto.nombre, precio:producto.precio, cantidad: 1, stock:producto.stock})
}

openNewCliente() {
  this.cliente = {};
  this.submitted = false;
  this.clienteDialog = true;
}

guardarCliente(){
  this.clienteService.guardar(this.clienteForm.value).subscribe(
    (res: any) => {
      this.cliente_seleccionado = res.cliente

      this.clienteDialog = false;
      this.clienteForm.reset();
    },
    (error: any) => {
      alert("Error al registrar el cliente")
    }
  )
}

buscarCliente(){
  this.clienteService.buscarCliente(this.buscar_clie.value).subscribe(
    (res: any) => {
      if(res.nombre_completo){
        this.cliente_seleccionado = res

      }else{
        this.cliente_seleccionado = null
      }
    },
    (error: any) => {
      alert("no se encontro al cliente")
    }
  )
  
}

aumentar(prod){
  if(prod.cantidad == prod.stock){
    prod.cantidad = prod.stock;
  }else{
    prod.cantidad++;

  }
}

reducir(prod){
  if(prod.cantidad == 1){
    prod.cantidad = 1;
  }else{
    prod.cantidad--;
  }
}


}
