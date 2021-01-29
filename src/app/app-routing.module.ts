import { NgModule } from '@angular/core';

import {Routes,RouterModule} from '@angular/router'
import {EmpresaComponent} from './components/empresa/empresa.component';
import {VentaComponent} from './components/venta/venta.component';

const routes:Routes = [
  {path:'dashboard', component:VentaComponent},
  {path:'venta', component:VentaComponent},
  {path:'empresa', component:EmpresaComponent},
  
  {path:'**',pathMatch:'full', redirectTo:'empresa'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }