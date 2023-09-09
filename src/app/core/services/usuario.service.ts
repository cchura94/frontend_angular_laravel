import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url_servidor = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get(`${this.url_servidor}/usuario`);
  }

  guardar( datos: Usuario ){
    return this.http.post(`${this.url_servidor}/usuario`, datos);
  }

  mostrar( id: number){
    return this.http.get(`${this.url_servidor}/usuario/${id}`);
  }

  modificar( id: number, datos: Usuario){
    return this.http.put(`${this.url_servidor}/usuario/${id}`, datos);
  }

  eliminar( id: number){
    return this.http.delete(`${this.url_servidor}/usuario/${id}`);
  }

}
