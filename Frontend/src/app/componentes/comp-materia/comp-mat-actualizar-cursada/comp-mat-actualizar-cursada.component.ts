import { MatriculaService } from './../../../services/matricula.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-comp-mat-actualizar-cursada',
  templateUrl: './comp-mat-actualizar-cursada.component.html',
  styleUrls: ['./comp-mat-actualizar-cursada.component.css']
})
export class CompMatActualizarCursadaComponent implements OnInit {
  
  @Input() id_alumno;
  @Input() id_carrera;
  @Input() id_inscripcion;
  @Input() id_materia;
  @Input() id_periodo;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;

  get nota() {return this.materiaForm.get('nota')}
  get estado() {return this.materiaForm.get('estado')}

  materiaForm = new FormGroup({
    nota: new FormControl('', [Validators.required,Validators.min(0),Validators.max(20),Validators.pattern("-*[0-9]*")]),
    estado: new FormControl('',[Validators.required])
  })

  public errorMessages = {
    nota:[
      { type: 'max', message: 'nota invalida, rango 0-20'},
      { type: 'min',  message:'nota invalida, rango 0-20'},
      { type: 'pattern',  message: 'solo puede contener números'}
    ],
    campo_requerido:[
      { type: 'required', message: 'campo requerido'}
    ]
  }
  constructor(private servicioMatricula: MatriculaService) { }

  ngOnInit(): void {
  }

  actualizar(){
    if(this.materiaForm.valid){
      let planitlla = {
        id_alumno: this.id_alumno,
        id_carrera: this.id_carrera,
        id_inscripcion: this.id_inscripcion,
        id_materia: this.id_materia,
        id_periodo: this.id_periodo,
        nota: this.materiaForm.value.nota,
        estado: this.materiaForm.value.estado,
      }

      this.servicioMatricula.actualizarMateriaCursada(planitlla).subscribe(
        () =>{},
        (data) =>{
          if(data.status == "200"){
            Swal.fire({
              title: 'Materia actualizada',
              text: 'La materia se actualizo correctamente',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.emitirEvento();
          }
          else {
            Swal.fire({
              title: '¡Error!',
              text: 'No se pudo actualizar la materia',
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
