import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { VentaService } from '../../services/venta.service';
import { EmpresaService } from '../../services/empresa.service';

import { VentaModule } from '../../models/venta/venta.module';
import {EmpresaModule} from '../../models/empresa/empresa.module';
import { VentaFormModule } from '../../models/venta/venta.form.module';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  ventas: VentaModule[] = [];
  empresas : EmpresaModule[]=[];
  valorMayor: VentaModule[] = [];
  venta: VentaModule = new VentaModule();
  ventaForm:VentaFormModule=new VentaFormModule();
  msg:string="";

  // Pie

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];

  constructor(private _ventaService: VentaService,private _empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.ListadoVentas();
    this.ValorTotalEmpresa();
    this.ListadoEmpresa();
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    let peticion: Observable<any>;
  
    peticion = this._ventaService.setVenta(this.ventaForm);

    peticion.subscribe((resp) => {
      this.msg=resp.mensaje;
      this.ListadoVentas();
    });
  }

  buscar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    let peticion: Observable<any>;

    peticion = this._ventaService.getValorMayor(
      this.venta.fechaVenta,
      this.venta.fechaFinal
    );

    peticion.subscribe((resp) => {
      this.valorMayor = resp;
    });
  }
  private ListadoVentas() {
    this._ventaService.getAllVentas().subscribe((resp) => {
      this.ventas = resp;
    });
  }
  private ValorTotalEmpresa() {
    this._ventaService.getValorTotalEmpresa().subscribe((resp) => {
      let x = 3;
      for (let item of resp) {
        this.pieChartColors[0].backgroundColor.push(
          'rgba(196,79,244,0.' + x + ')'
        );
        this.pieChartLabels.push([item.nombre]);
        this.pieChartData.push(item.total);
        x = x + 1;
      }
    });
  }

  private ListadoEmpresa(){
    this._empresaService.getAllEmpresas().subscribe((resp) => {
      this.empresas = resp;
    });
  }
}
