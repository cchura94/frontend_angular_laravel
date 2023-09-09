import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url_servidor = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Categoria>(`${this.url_servidor}/categoria`);
  }

  guardar( datos: Categoria ){
    return this.http.post(`${this.url_servidor}/categoria`, datos);
  }

  mostrar( id: number){
    return this.http.get(`${this.url_servidor}/categoria/${id}`);
  }

  modificar( id: number, datos: Categoria){
    return this.http.put(`${this.url_servidor}/categoria/${id}`, datos);
  }

  eliminar( id: number){
    return this.http.delete(`${this.url_servidor}/categoria/${id}`);
  }
}
