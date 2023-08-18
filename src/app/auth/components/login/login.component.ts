import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router){}

  ingresar(){
    let credenciales: any = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.loginConLaravel(credenciales).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.setItem("access_token", res.access_token)

        this.router.navigate(['/admin/perfil']);
      },
      (error: any) => {
        console.log(error)
        Swal.fire(
          'Error!',
          'Error al autenticar!',
          'error'
        )
      }
    )
  }

}
