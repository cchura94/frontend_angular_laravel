import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  usuarioForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  visible: boolean = false;

    

  usuarios:any[] = []
  usuario_id: any = null;

  constructor(private usuarioService: UsuarioService){
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.listar().subscribe(
      (res:any) => {
        this.usuarios = res;
      },
      (error: any) => {

      }
    )

  }

  guardarUsuario(){
    if(this.usuario_id){
      const user: Usuario = {
        name: this.usuarioForm.value.name,
        email: this.usuarioForm.value.email,
        password: this.usuarioForm.value.password
      }
      this.usuarioService.modificar(this.usuario_id, user).subscribe(
        (res:any) => {
          this.getUsuarios()
          this.usuario_id = null
          this.usuarioForm.reset()
        },
        (error: any) => {
  
        }
      )

    }else{
      const user: Usuario = {
        name: this.usuarioForm.value.name,
        email: this.usuarioForm.value.email,
        password: this.usuarioForm.value.password
      }
      this.usuarioService.guardar(user).subscribe(
        (res:any) => {
          this.getUsuarios()
        },
        (error: any) => {
  
        }
      )

    }
  }

  funEditar(us: any) {
    this.usuario_id = us.id;

    this.usuarioForm = new FormGroup({
      name: new FormControl(us.name, [Validators.required]),
      email: new FormControl(us.email, [Validators.email, Validators.required]),
      password: new FormControl(us.password, [Validators.required])
    });
  }

  funEliminar(us: any) {
    if(confirm("Esta seguro de eliminar un usuario?")){
      this.usuarioService.eliminar(us.id).subscribe(
        (res:any) => {
          this.getUsuarios()
        },
        (error: any) => {
  
        }
      )
    }

  }

  showDialog() {
    this.visible = true;
}

}
