import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url_servidor = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  listar(page=1){
    return this.http.get(`${this.url_servidor}/cliente?page=${page}`);
  }

  guardar( datos: any ){
    return this.http.post(`${this.url_servidor}/cliente`, datos);
  }

  mostrar( id: number){
    return this.http.get(`${this.url_servidor}/cliente/${id}`);
  }

  modificar( id: number, datos: any){
    return this.http.put(`${this.url_servidor}/cliente/${id}`, datos);
  }

  eliminar( id: number){
    return this.http.delete(`${this.url_servidor}/cliente/${id}`);
  }

  buscarCliente(q=''){
    return this.http.get(`${this.url_servidor}/cliente/buscar?q=${q}`);
  }
}
