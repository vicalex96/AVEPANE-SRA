import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.css']
})
export class ListadoAlumnosComponent implements OnInit {

  @Input()modo_edicion;
  @Input()link;
  @Input()prefiltro;

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
    if(this.prefiltro == 'materias'){
      this.elegir_carrera = 'inscritos'
    }
    this.servicioAlumno.getAlumnos().subscribe((data)=>{
      this.lista_alumnos = data;
      this.longitud = Object.keys(data).length;
    })
  }
}
