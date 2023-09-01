import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url_servidor = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  listar(page=1, limit=10, q=''){
    return this.http.get(`${this.url_servidor}/producto?page=${page}&limit=${limit}&q=${q}`);
  }

  guardar( datos: any ){
    return this.http.post(`${this.url_servidor}/producto`, datos);
  }

  mostrar( id: number){
    return this.http.get(`${this.url_servidor}/producto/${id}`);
  }

  modificar( id: number, datos: any){
    return this.http.put(`${this.url_servidor}/producto/${id}`, datos);
  }

  eliminar( id: number){
    return this.http.delete(`${this.url_servidor}/producto/${id}`);
  }

  actualizarImagen(fd, id){
    return this.http.post(`${this.url_servidor}/producto/${id}/actualizar-imagen`, fd);
  }
}
