import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarrerasComponent } from './carreras.component';

const routes: Routes = [
  {
    path:'carreras', component: CarrerasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrerasRoutingModule { }
