import { PerfilMatriculaComponent } from './perfil-matricula/perfil-matricula.component';
import { MatriculaComponent } from './matricula.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "matricula",
    children: [
      { path: "", component: MatriculaComponent },
      { path: "alumno", component: PerfilMatriculaComponent},
      //{ path: 'nuevo-registro', component: RegistrarAlumnoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule { }
