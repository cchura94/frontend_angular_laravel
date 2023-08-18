import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  miperfil: any;

  constructor(private authService: AuthService){
    this.obtenerPerfil()
  }

  obtenerPerfil(){
    this.authService.getPerfil().subscribe(
      (res: any) => {
        this.miperfil = res
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
