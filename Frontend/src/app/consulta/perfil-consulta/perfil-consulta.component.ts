import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-consulta',
  templateUrl: './perfil-consulta.component.html',
  styleUrls: ['./perfil-consulta.component.css']
})
export class PerfilConsultaComponent implements OnInit {

  alumno;
  inscripcion;
  documentos;
  telefonos;

  id_alumno = 0;
  id_carrera;
  id_inscripcion;
  constructor( private route: ActivatedRoute,
               private servicioAlumno: AlumnoService) { }

  ngOnInit(): void {

    this.id_alumno = +this.route.snapshot.queryParams.id;
    console.log('id_alumno', this.id_alumno)

    this.servicioAlumno.getAlumno(this.id_alumno).subscribe((data)=>{
      this.alumno = data;
      console.log('data:',this.alumno)
    })

    this.servicioAlumno.getInscripcion(this.id_alumno).subscribe((data)=>{
      this.inscripcion = data;
      console.log('insrcipcion: ',this.inscripcion)

      if(data != null){
        
        this.servicioAlumno.getdocumentos(this.inscripcion.id_alumno, this.inscripcion.id_carrera, this.inscripcion.id).subscribe((data)=>{
          this.documentos = data;
          console.log(this.documentos)
        })
        this.id_carrera = this.inscripcion.id_carrera;
        this.id_inscripcion = this.inscripcion.id;
      }

    })

    this.servicioAlumno.getTelefonos(this.id_alumno).subscribe((data)=>{
      this.telefonos = data;
      console.log(this.telefonos)
    })

  }

}
