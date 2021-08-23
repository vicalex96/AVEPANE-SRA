import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlumnoService } from './../../../services/alumno.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editar-correo',
  templateUrl: './editar-correo.component.html',
  styleUrls: ['./editar-correo.component.css']
})
export class EditarCorreoComponent implements OnInit {

  @Input() alumno;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;

  get email() {return this.CorreoForm.get('email')}

  CorreoForm = new FormGroup({
    email: new FormControl('', [Validators.maxLength(100), Validators.required, Validators.email])
  })
  

  public errorMessages = {
    email: [
      { type: 'required', message: 'campo requerido'},
      { type: 'maxLength', message: 'se ha superado límite de tamaño'},
      { type: 'email',  message: 'el email no esta bien escrito'}
    ],
  }
  constructor(private servicioAlumno :AlumnoService) { }

  ngOnInit(): void {
  }

  registrar(){
    if(this.CorreoForm.valid){
      let planilla = {
        id: +this.alumno.id,
        correo:  this.CorreoForm.value.email
      }
      console.log(planilla)
      this.servicioAlumno.updateCorreoAlumno(planilla).subscribe(
        () =>{},
        (data) =>{
          if(data.status == "200"){
            alert('correo actualizado correctamente'); 
            this.emitirEvento();
          }
          else {
            alert('=/ ocurrio un problema, no se pudo actualizar el correo, revise su conexión'); 
          }
        }
      ) 

    } 

  }

  emitirEvento(arg?){
    this.actualizacion.emit( this.contenido);
  }
}
