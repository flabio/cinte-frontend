import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';

import { EmpresaComponent } from './components/empresa/empresa.component';
import { VentaComponent } from './components/venta/venta.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    
    EmpresaComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
