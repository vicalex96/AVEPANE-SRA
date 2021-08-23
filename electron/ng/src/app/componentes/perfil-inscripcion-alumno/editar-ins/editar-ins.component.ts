import { MatriculaService } from './../../../services/matricula.service';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-ins',
  templateUrl: './editar-ins.component.html',
  styleUrls: ['./editar-ins.component.css']
})
export class EditarInsComponent implements OnInit {

  @Input() inscripcion;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;

  carreras;

  tipo_inscripcion;
  estado_inscripcion;
  fecha_formateada;

  get carrera_id() {return this.inscripcionForm.get('id_carrera')}
  get fecha_inscripcion() {return this.inscripcionForm.get('fecha_inscripcion')}
  get tipo_ins() {return this.inscripcionForm.get('tipo_ins')}
  get estado_ins() {return this.inscripcionForm.get('estado_ins')}

  inscripcionForm;

  public errorMessages = {
    campo_requerido:[
      { type: 'required', message: 'campo requerido'}
    ]
  }

  constructor( private servicioMatricula: MatriculaService) { }

  ngOnInit(): void {
    this.servicioMatricula.getCarreras().subscribe((data) =>{
      this.carreras = data;
    })

    //las siguientes dos lineas son requeridas para que el input date pueda leer la fecha de la inscripcion
    this.fecha_formateada = (this.inscripcion.fecha_inscripcion.split('T'))[0]
    console.log(this.fecha_formateada);

    //debio a lo mencionado en el comentario anterior se debe inicializar el form group aqui 
    this.inscripcionForm = new FormGroup({
      id_carrera: new FormControl(this.inscripcion.id_carrera,Validators.required),
      fecha_inscripcion: new FormControl(this.fecha_formateada,Validators.required),
      tipo_ins: new FormControl(this.inscripcion.tipo_ins,Validators.required),
      estado_ins: new FormControl(this.inscripcion.estado_ins,Validators.required)
    })
  }

  registrar(){
    if(this.inscripcionForm.valid){
      let planilla = {
        id_alumno: this.inscripcion.id_alumno,
        old_id_carrera: this.inscripcion.id_carrera,
        new_id_carrera: this.inscripcionForm.value.id_carrera,
        id: this.inscripcion.id,
        fecha_inscripcion: this.inscripcionForm.value.fecha_inscripcion,
        tipo_ins: this.inscripcionForm.value.tipo_ins,
        estado_ins: this.inscripcionForm.value.estado_ins,
      }

      this.servicioMatricula.actualizarInscripcion(planilla).subscribe(
        () =>{},
        (data) =>{
          if(data.status == "200"){
            alert('inscripción editada');
            this.emitirEvento();
          }
          else alert('=/ ocurrio un problema, revise la conexión con el servidor'); 
        }
      ) 

    }  
  }

  emitirEvento(arg?){
    this.actualizacion.emit( this.contenido);
  }
}
