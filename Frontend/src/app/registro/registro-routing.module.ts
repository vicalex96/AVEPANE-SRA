import { RegistrarPerfilComponent } from './registrar-perfil/registrar-perfil.component';
import { RegistrarAlumnoComponent } from './registrar-alumno/registrar-alumno.component';
import { RegistroComponent } from './registro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "registro",
    children: [
      { path: "", component: RegistroComponent },
      { path: "alumno", component: RegistrarPerfilComponent},
      { path: 'nuevo-registro', component: RegistrarAlumnoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }



