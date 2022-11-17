import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private API_SERVER="http://localhost:8080/cliente/";
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllClientes(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveCliente(cliente: any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, cliente)
  }

  public deleteCliente(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER+"delete/"+id);
  }

}
