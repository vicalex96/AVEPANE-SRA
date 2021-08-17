import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevosEstudiantesRoutingModule } from './nuevos-estudiantes-routing.module';
import { NuevosEstudiantesComponent } from './nuevos-estudiantes.component';


@NgModule({
  declarations: [
    NuevosEstudiantesComponent
  ],
  imports: [
    CommonModule,
    NuevosEstudiantesRoutingModule
  ]
})
export class NuevosEstudiantesModule { }
