import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevosEstudiantesComponent } from './nuevos-estudiantes.component';

const routes: Routes = [
  {
    path:'nuevos-estudiantes', component: NuevosEstudiantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevosEstudiantesRoutingModule { }
