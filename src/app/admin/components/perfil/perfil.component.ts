import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  miperfil: any;

  constructor(private authService: AuthService, private router: Router){
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

  salir(){
    this.authService.salir().subscribe(
      (res: any) => {
        localStorage.removeItem("access_token")
        this.router.navigate(["/auth/login"]);

      },(error) => {
        console.log(error);
      }
    )
  }

}
