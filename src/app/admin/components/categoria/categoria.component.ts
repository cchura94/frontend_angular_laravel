import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  categorias: any[] = []
  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    detalle: new FormControl('')
  });

  categoria_id: number;

  visible: boolean = false;

  constructor(private categoriaService: CategoriaService){
    this.listarCategorias()
  }

  listarCategorias(){
    this.categoriaService.listar().subscribe(
      (res: any) => {
        this.categorias = res
      },
      (error: any) => {
        console.log(error) 
      }
    )
  }

  guardarCategoria(){
    if(this.categoria_id){

      const datos = {
        nombre: this.categoriaForm.value.nombre,
        detalle: this.categoriaForm.value.detalle
      }

      this.categoriaService.modificar(this.categoria_id, datos).subscribe(
        (res) => {
          this.listarCategorias()
          this.visible = false
  
          this.categoriaForm.reset();
          this.categoria_id = null
        },
        (error: any) => {
          console.log(error) 
        }
      )

    }else{

      const datos = {
        nombre: this.categoriaForm.value.nombre,
        detalle: this.categoriaForm.value.detalle
      }

      this.categoriaService.guardar(datos).subscribe(
        (res) => {
          this.listarCategorias()
          this.visible = false
  
          this.categoriaForm.reset();
        },
        (error: any) => {
          console.log(error) 
        }
      )
    }
  }


    showDialog() {
        this.visible = true;
    }

    editCategoria(cat){
      this.categoria_id = cat.id;

      this.categoriaForm = new FormGroup({
        nombre: new FormControl(cat.nombre, [Validators.required]),
        detalle: new FormControl(cat.detalle)
      });

      this.showDialog()
    }
    deleteCategoria(cat){
      if(confirm("Está seguro de eliminar categoria?")){
        this.categoriaService.eliminar(cat.id).subscribe(
          (res) => {
            this.listarCategorias()
          },
          (error: any) => {
            console.log(error) 
          }
        )
      }

    }

}
