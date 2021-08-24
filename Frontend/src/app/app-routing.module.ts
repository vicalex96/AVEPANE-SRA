import { PagPrincipalComponent } from './pag-principal/pag-principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {path:"**",redirectTo:'/principal',pathMatch:'full' }
];

@NgModule({
  declarations: [],
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
  
})
export class AppRoutingModule { } 
