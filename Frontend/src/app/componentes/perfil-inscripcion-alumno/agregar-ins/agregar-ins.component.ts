import { MatriculaService } from '../../../services/matricula.service';
import { AlumnoService } from '../../../services/alumno.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-ins',
  templateUrl: './agregar-ins.component.html',
  styleUrls: ['./agregar-ins.component.css']
})
export class AgregarInsComponent implements OnInit {

  @Input() id_alumno: number;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;
  carreras;

  get id_carrera() {return this.inscripcionForm.get('id_carrera')}
  get fecha_inscripcion() {return this.inscripcionForm.get('fecha_inscripcion')}
  get tipo_ins() {return this.inscripcionForm.get('tipo_ins')}
  get estado_ins() {return this.inscripcionForm.get('estado_ins')}

  inscripcionForm = new FormGroup({
    id_carrera: new FormControl('',Validators.required),
    fecha_inscripcion: new FormControl('',Validators.required),
    tipo_ins: new FormControl('',Validators.required),
    estado_ins: new FormControl('',Validators.required)
  })

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
  }

  registrar(){
    if(this.inscripcionForm.valid){
      let planilla = {
        id_alumno: this.id_alumno,
        id_carrera: this.inscripcionForm.value.id_carrera,
        fecha_inscripcion: this.inscripcionForm.value.fecha_inscripcion,
        tipo_ins: this.inscripcionForm.value.tipo_ins,
        estado_ins: this.inscripcionForm.value.estado_ins,
      }

      this.servicioMatricula.insertInscripcion(planilla).subscribe(
        () =>{},
        (data) =>{
          if(data.status == "200"){
            Swal.fire({
              title: 'proceso completado',
              text: 'inscripción registrada',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.emitirEvento();
          }
          else {
            Swal.fire({
              title: '¡Error!',
              text: 'ocurrio un problema, revise la conexión con el servidor',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        }
      ) 

    }  
  }


  emitirEvento(arg?){
    console.log('evento activado lista de telefonos')
    this.actualizacion.emit( this.contenido);
  }

}
