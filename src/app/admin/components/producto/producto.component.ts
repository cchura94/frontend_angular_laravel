import { Component } from '@angular/core';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  products: any[] = []
  constructor(private productoService: ProductoService){
    this.listar()
  }

  listar(){
    this.productoService.listar().subscribe(
      (res: any) => {
        this.products = res.data 
      }
    )

  }

}
