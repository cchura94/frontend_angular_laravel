import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [MessageService]
})
export class ProductoComponent {
  products: any[] = []
  totalRecords!: number;
  buscar = new FormControl('');

  loading: boolean = false;
  product!: any;
  productDialog: boolean = false;
  productDialogImagen: boolean = false
  productoId: any;
  uploadedFiles: any[] = [];

  submitted: boolean = false;

  categorias: any[] = []

  productoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl(''),
    stock: new FormControl(''),
    categoria_id: new FormControl(''),
    descripcion: new FormControl('')
  });
  
  constructor(private productoService: ProductoService,
              private categoriaService: CategoriaService,
              private messageService: MessageService){
    this.listar()
    this.getCategorias();
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

  getCategorias() {
    this.categoriaService.listar().subscribe(
      (res:any) => {
        this.categorias = res;        
      },
      (error: any) => {
        console.log(error);
      }
    )

  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

guardarProducto(){
  this.productoService.guardar(this.productoForm.value).subscribe(
    (res: any) => {
      this.listar();

      this.productDialog = false;
      this.productoForm.reset();
    },
    (error: any) => {
      alert("Ocurrió un error al registrar el Producto")
    }
  )
}

dialogImagenProducto(prod){
  this.productoId = prod.id;
  this.productDialogImagen = true
}


myUploader(event) {
  //event.files == files to upload
  console.log(event.files)
  let formData = new FormData()
  formData.append("imagen", event.files[0])
  
  this.productoService.actualizarImagen(formData, this.productoId).subscribe(
    (res: any) => {
      this.listar()
      this.messageService.add({severity: 'info', summary: 'Imagen Actualizada', detail: ''});

    },
    (error: any) => {
      this.messageService.add({severity: 'error', summary: 'Error al actualizar', detail: ''});

    }
    )
    this.productDialogImagen = false

}


}
