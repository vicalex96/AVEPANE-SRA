import { AlumnoService } from './../../../services/alumno.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-agrear-doc',
  templateUrl: './agrear-doc.component.html',
  styleUrls: ['./agrear-doc.component.css']
})
export class AgrearDocComponent implements OnInit {

  @Input() modo_edicion;
  @Input() id_alumno: number;
  @Input() id_carrera: number;
  @Input() id_inscripcion: number;
  documentos: object;

  get id_documento() {return this.documentoForm.get('id_documento')}


  documentoForm = new FormGroup({
    id_documento: new FormControl('',Validators.required),
  })

  public errorMessages = {
    campo_requerido:[
      { type: 'required', message: 'campo requerido'}
    ]
  }
  constructor(private servicioAlumno: AlumnoService) { }

  ngOnInit(): void {
    this.servicioAlumno.getdocumento_faltantes(this.id_alumno,this.id_carrera,this.id_inscripcion).subscribe(
      (data)=>{
        this.documentos = data;
    })
  }

  registrar(){
        if(this.documentoForm.valid){
      let planilla = {
        id_alumno: this.id_alumno,
        id_carrera: this.id_carrera,
        id_inscripcion: this.id_inscripcion,
        id_documento: this.documentoForm.value.id_documento,
      }

      this.servicioAlumno.insertDocumento(planilla).subscribe(
        () =>{},
        (data) =>{
          if(data.status == "200"){
            
          }
          else alert('=/ ocurrio un problema, revise la conexión con el servidor'); 
        }
      ) 

    }  
  }

}
