import { Injectable } from '@angular/core';

import { HttpClient}  from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {Departamento} from '../Interfaces/departamento';
import { Empleado } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private endpoint = environment.endpoint;
  private apiUrl: string = this.endpoint + 'departamento/';

  constructor(private http: HttpClient) {}

  getList(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}lista`);
  }
}
