
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.component.html',
  styleUrls: ['./registrar-alumno.component.css']
})
export class RegistrarAlumnoComponent implements OnInit {

  
  numero = 10;
  get cedula() {return this.registroForm.get('cedula')}
  get tipo_cedula() { return this.registroForm.get('tipo_cedula') }
  get nombre() { return this.registroForm.get('nombre') }
  get nombre2() {return this.registroForm.get('nombre2')}
  get apellido() {return this.registroForm.get('apellido')}
  get apellido2() {return this.registroForm.get('apellido2')}
  get genero() {return this.registroForm.get('genero')}
  get fecha_nacimiento() {return this.registroForm.get('fecha_nacimiento')}
  get email() {return this.registroForm.get('email')}

  registroForm = new FormGroup({
    cedula: new FormControl('', [Validators.max(999999999),Validators.pattern("[0-9]*"),Validators.required]),
    tipo_cedula: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.maxLength(40), Validators.required]),
    nombre2: new FormControl('',[Validators.maxLength(80)]),
    apellido: new FormControl('',[Validators.maxLength(40), Validators.required]),
    apellido2: new FormControl('',[Validators.maxLength(80)]),
    genero: new FormControl('',[Validators.required]),
    fecha_nacimiento: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.maxLength(100), Validators.email]),
  });
  
  public errorMessages = {
    cedula:[
      { type: 'required', message: 'campo requerido'},
      { type: 'max', message: 'se ha superado límite de tamaño'},
      { type: 'pattern',  message: 'solo puede contener números'}
    ],
    nombre_apellido: [
      { type: 'required', message: 'campo requerido'},
      { type: 'maxlength',  message: 'Maximo de caracteres superado'},
      { type: 'pattern',  message: 'error de patron'}
    ],
    nombre_apellido_Opcional: [
      { type: 'maxlength',  message: 'Maximo de caracteres superado'}
    ],
    email: [
      { type: 'required', message: 'campo requerido'},
      { type: 'maxLength', message: 'se ha superado límite de tamaño'},
      { type: 'email',  message: 'el email no esta bien escrito'}
    ],
    campo_requerido:[
      { type: 'required', message: 'campo requerido'}
    ]
  }


  constructor(
           private servicioAlumno :AlumnoService,
           private router: Router,
           ) { }

  ngOnInit(): void {

  }

  registrar(){
    if(this.registroForm.valid){
      this.registroForm.value.fecha_nacimiento.year
      this.servicioAlumno.insertRegistro(this.registroForm.value).subscribe(
        (id_alumno) =>{
          console.log('/registro/alumno?id='+id_alumno);
          Swal.fire({
            title: "Registro completado",
            text: "Se registro a la persona correctamente",
            icon: "success",
            confirmButtonText: 'Cool'
          })
          this.router.navigateByUrl('/registro/alumno?id='+id_alumno);
        },
        (e) =>{
          Swal.fire({
            title: "Error al registrar",
            text: "no se pudo registrar a la persona, comprueba la conexion a la red",
            icon: "error",
            confirmButtonText: 'Cool'
          })
        }
      ) 

    }
  }
}
