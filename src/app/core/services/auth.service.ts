import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_servidor = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  loginConLaravel(credenciales: any){
    return this.http.post(`${this.url_servidor}/v1/auth/login`, credenciales);
  }
  registrarse(datos: any){
    return this.http.post(`${this.url_servidor}/v1/auth/register`, datos);
  }
  getPerfil(){
    return this.http.get(`${this.url_servidor}/v1/auth/profile`);
  }
  salir(datos:any={}){
    return this.http.post(`${this.url_servidor}/v1/auth/logout`, datos);
  }
}
