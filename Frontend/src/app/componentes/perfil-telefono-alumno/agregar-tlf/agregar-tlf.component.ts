import { AlumnoService } from '../../../services/alumno.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agregar-tlf',
  templateUrl: './agregar-tlf.component.html',
  styleUrls: ['./agregar-tlf.component.css']
})
export class AgregaTelfComponent implements OnInit {
  @Input() id_alumno: number;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;
  
  get numero() {return this.telefonoForm.get('numero')}
  get tipo_tlf() {return this.telefonoForm.get('tipo_tlf')}

  telefonoForm = new FormGroup({
    numero: new FormControl('',[Validators.required, Validators.pattern("[0-9]*"),Validators.max(9999999999999999)]),
    tipo_tlf:  new FormControl('',[Validators.required])
  })
  public errorMessages = {
    numero:[
      { type: 'required', message: 'campo requerido'},
      { type: 'max', message: 'se ha superado límite de tamaño'},
      { type: 'pattern',  message: 'solo puede contener números'}
    ],
    campo_requerido:[
      { type: 'required', message: 'campo requerido'}
    ]
  }

  constructor(private servicioAlumno: AlumnoService) { }

  ngOnInit(): void {
  }

  registrar(){
    if(this.telefonoForm.valid){
      let telefono = {
        id_alumno: this.id_alumno,
        numero: this.telefonoForm.value.numero,
       tipo_tlf: this.telefonoForm.value.tipo_tlf
      }
      console.log('telefono: ' +telefono);
      this.servicioAlumno.insertTelefono(telefono).subscribe(
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
  }

  emitirEvento(arg?){
    this.actualizacion.emit(this.contenido);
  }

}