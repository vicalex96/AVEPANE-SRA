import { PerfilConsultaComponent } from './perfil-consulta/perfil-consulta.component';
import { ConsultaComponent } from './consulta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: "consultas",
      children: [
        { path: "", component: ConsultaComponent },
        { path: "alumno", component: PerfilConsultaComponent },
      ]
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
