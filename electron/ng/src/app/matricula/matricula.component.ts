import { AlumnoService } from './../services/alumno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  lista_alumnos;
  pagina;
  page_size : number = 10;
  page_number: number = 1;
  longitud;
  busqueda_filtro = '';
  elegir_carrera = '';
  constructor(private servicioAlumno : AlumnoService) {

   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.servicioAlumno.getAlumnos().subscribe((data)=>{
      this.lista_alumnos = data;
      this.longitud = Object.keys(data).length;
    })
  }

}
