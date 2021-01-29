import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay  } from 'rxjs/operators';
import{EmpresaModule} from '../models/empresa/empresa.module';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url = "https://localhost:44371/api/Empresa/v1";
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private _http: HttpClient) { }
  
  setEmpresa(empresa: EmpresaModule) {
    return this._http.post<any>(`${this.url}/addempresa`, empresa, { headers: this.headers })
      .pipe(
        map((resp: any) => {
          return resp;
        },
          (error: any) => {
            return error.error;
          }
        ),
      );
  }
  getAllEmpresas() {
    return this._http.get(`${this.url}/listado`).pipe(
      map(this.crearArreglo),
      delay(10)
    )
  }
  private crearArreglo(Obj: any) {

    const empresas: EmpresaModule[] = [];

    Object.keys(Obj).forEach(key => {
      const empresa: EmpresaModule = Obj[key];
      empresas.push(empresa);
    });
    return empresas;
  }



}
