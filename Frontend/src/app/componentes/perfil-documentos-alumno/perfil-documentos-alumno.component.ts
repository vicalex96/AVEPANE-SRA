import { MatriculaService } from './../../services/matricula.service';
import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-perfil-documentos-alumno',
  templateUrl: './perfil-documentos-alumno.component.html',
  styleUrls: ['./perfil-documentos-alumno.component.css']
})
export class PerfilDocumentosAlumnoComponent implements OnInit {
  @Input() modo_edicion;
  @Input() documentos;
  @Input() inscripcion;
  @Input() id_alumno;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;
  editar_docs = false;

  constructor(private servicioMatricula: MatriculaService) { }

  ngOnInit(): void {
  }

  agregarDoc(id){
    let plantilla = {
      id_alumno: this.id_alumno,
      id_carrera: this.inscripcion.id_carrera,
      id_inscripcion: this.inscripcion.id,
      id_documento: id
    }

    this.servicioMatricula.agregarDocInscripcion(plantilla).subscribe(
      () =>{},
      (data) =>{
        if(data.status == "200"){
          console.log('todo bien');
          this.emitirEvento()
        }
        else console.log('algo salio mal!'); 
      }
     )

  }

  eliminarDoc(id){
    let plantilla = {
      id_alumno: this.id_alumno,
      id_carrera: this.inscripcion.id_carrera,
      id_inscripcion: this.inscripcion.id,
      id_documento: id
    }
    this.servicioMatricula.eliminarDocInscripcion(plantilla).subscribe(
      () =>{},
      (data) =>{
        if(data.status == "200"){
          console.log('todo bien');
          this.emitirEvento()
        }
        else console.log('algo salio mal!'); 
      }
     )
  }

  emitirEvento(arg?){
    this.actualizacion.emit(this.contenido);
  }


}
