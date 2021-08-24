import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-matricula',
  templateUrl: './perfil-matricula.component.html',
  styleUrls: ['./perfil-matricula.component.css']
})
export class PerfilMatriculaComponent implements OnInit {

  id_alumno;
  id_carrera;
  id_inscripcion;

  alumno;
  inscripcion;
  constructor(private route: ActivatedRoute,
    private servicioAlumno: AlumnoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(event => {
      this.id_alumno = event.id;
      });
  
      this.id_alumno = +this.route.snapshot.queryParams.id;
      this.servicioAlumno.getAlumno(this.id_alumno).subscribe((data)=>{
        this.alumno = data;
        console.log('data:',this.alumno)
      })
  
      this.servicioAlumno.getInscripcion(this.id_alumno).subscribe((data)=>{
        this.inscripcion = data;
        console.log(this.inscripcion)

      this.id_carrera = this.inscripcion.id_carrera;
      this.id_inscripcion = this.inscripcion.id;
      })
  }

}

