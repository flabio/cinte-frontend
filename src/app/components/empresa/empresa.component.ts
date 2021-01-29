import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { EmpresaService } from '../../services/empresa.service';
import { EmpresaModule } from '../../models/empresa/empresa.module';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
})
export class EmpresaComponent implements OnInit {
  empresas: EmpresaModule[] = [];
  empresa: EmpresaModule = new EmpresaModule();
  msg:string="";
  constructor(private _empresaService: EmpresaService) {}

  ngOnInit(): void {
 this.ListadoEmpresa();
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    let peticion: Observable<any>;
  
    peticion = this._empresaService.setEmpresa(this.empresa);

    peticion.subscribe((resp) => {
      this.msg=resp.mensaje;
      this.ListadoEmpresa();
    });
  }
  private ListadoEmpresa(){
    this._empresaService.getAllEmpresas().subscribe((resp) => {
      this.empresas = resp;
    });
  }
}
