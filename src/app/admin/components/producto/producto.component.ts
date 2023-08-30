import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  products: any[] = []
  totalRecords!: number;
  buscar = new FormControl('');

  loading: boolean = false;
  product!: any;
  productDialog: boolean = false;

  submitted: boolean = false;

  productoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl(''),
    stock: new FormControl(''),
    categoria_id: new FormControl(''),
    descripcion: new FormControl('')
  });
  
  constructor(private productoService: ProductoService){
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

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}


}
