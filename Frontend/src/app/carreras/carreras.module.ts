import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrerasRoutingModule } from './carreras-routing.module';
import { CarrerasComponent } from './carreras.component';


@NgModule({
  declarations: [
    CarrerasComponent
  ],
  imports: [
    CommonModule,
    CarrerasRoutingModule
  ]
})
export class CarrerasModule { 
  constructor(){

  }
} 
