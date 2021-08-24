import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-perfil',
  templateUrl: './registrar-perfil.component.html',
  styleUrls: ['./registrar-perfil.component.css']
})
export class RegistrarPerfilComponent implements OnInit {
  alumno;
  inscripcion;
  documentos;
  telefonos;

  id_alumno;
  inscribir = false;
  editar = false; 
  correo_edicion = false;
  
  constructor( private route: ActivatedRoute,
               private servicioAlumno: AlumnoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(event => {
    this.id_alumno = event.id;
    });

    this.id_alumno = +this.route.snapshot.queryParams.id;
    console.log('id: '+this.id_alumno)

    this.getAlumno();

    this.getInscripcion();

    this.getTelefonos();
  }

  getAlumno(arg?){
    this.servicioAlumno.getAlumno(this.id_alumno).subscribe((data)=>{
      this.alumno = data;
    })
  }

  getTelefonos( arg? ){
    console.log('actualizando telefonos')
    this.servicioAlumno.getTelefonos(this.id_alumno).subscribe((data)=>{
      this.telefonos = data;
    })
  }

  getDocumentos( arg?){
    this.servicioAlumno.getdocumentos(this.inscripcion.id_alumno, this.inscripcion.id_carrera, this.inscripcion.id).subscribe((data)=>{
      this.documentos = data;
    })
  }

  getInscripcion( arg?){
    this.servicioAlumno.getInscripcion(this.id_alumno).subscribe((data)=>{
      this.inscripcion = data;

      if(data != null){
        this.getDocumentos();
      }
    }) 
  }



}
