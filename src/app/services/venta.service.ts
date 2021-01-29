import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay  } from 'rxjs/operators';
import{VentaModule} from '../models/venta/venta.module';
import{VentaFormModule} from '../models/venta/venta.form.module';
@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private url = "https://localhost:44371/api/Venta/v1";
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  
  constructor(private _http: HttpClient) { }
  setVenta(venta:VentaFormModule){
    console.log(venta);
    return this._http.post<any>(`${this.url}/addventa`, venta, { headers: this.headers })
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
  getAllVentas() {
    return this._http.get(`${this.url}/listado`).pipe(
      map(this.crearArreglo),
      delay(10)
    )
  }
  getValorTotalEmpresa() {
    return this._http.get(`${this.url}/ValorTotalEmpresa`).pipe(
      map((resp:any)=>{
        return resp;
      }),
      delay(10)
    )
  }
  getValorMayor(Fecha1:string,Fecha2:string){
    return this._http.get(`${this.url}/ValorMayor/?Fecha1=${Fecha1}&&Fecha2=${Fecha2}`).pipe(
      map((resp:any)=>{
        return resp;
      }),
      delay(10)
    )
  }
  private crearArreglo(Obj: any) {

    const ventas: VentaModule[] = [];

    Object.keys(Obj).forEach(key => {
      const venta: VentaModule = Obj[key];
      ventas.push(venta);
    });
    return ventas;
  }



}
