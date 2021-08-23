
import { MatriculaService } from './../../../services/matricula.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comp-mat-inscribir',
  templateUrl: './comp-mat-inscribir.component.html',
  styleUrls: ['./comp-mat-inscribir.component.css']
})
export class CompMatInscribirMatComponent implements OnInit {

  @Input() id_alumno: number;
  @Input() id_inscripcion: number;
  @Input() id_carrera: number;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;

  Materias;
  slt_materia;
  fecha_actual;
  Periodos; 

  get id_materia() {return this.MateriaForm.get('id_materia')}
  get fecha_cursado() {return this.MateriaForm.get('fecha_cursado')}
  get id_periodo() {return this.MateriaForm.get('id_periodo')}

  MateriaForm = new FormGroup({
    id_materia: new FormControl('',[Validators.required]),
    fecha_cursado: new FormControl('',[Validators.required]),
    id_periodo: new FormControl(20211,[Validators.required])
  })

  public errorMessages = {
    campo_requerido:[
      { type: 'required', message: 'campo requerido'}
    ]
  }

  constructor(private servicioMatricula: MatriculaService) {
  }

  ngOnInit(): void {
    console.log('id_carrera:',this.id_carrera)
    this.servicioMatricula.getMaterias(this.id_carrera).subscribe((data)=>{
      this.Materias = data;
      this.cargarPeriodos();
    })

  }

  cargarInfoMateria(id){
    for(let materia of this.Materias){
      if(materia.id == id){
        this.slt_materia = materia;
        return;
      }
    }
    
  }
  cargarPeriodos(){
    this.servicioMatricula.getPeriodos().subscribe((data) => {
      
      this.Periodos = data;
      console.log('periodos: ', data)
    });
  }

  registrar(){
    if(this.MateriaForm.valid){
      let planilla = {
        id_alumno: +this.id_alumno,
        id_carrera: +this.id_carrera,
        id_inscripcion: this.id_inscripcion ,
        id_materia: +this.MateriaForm.value.id_materia + 0,
        id_periodo: this.MateriaForm.value.id_periodo,
        fecha_cursado:  this.MateriaForm.value.fecha_cursado,
        estado: 'cursando',
        
      }
      console.log(planilla)
      this.servicioMatricula.insertMateriaACursar(planilla).subscribe(
        () =>{},
        (data) =>{
          if(data.status == "200"){
            alert('materia inscrita correctamente'); 
            this.MateriaForm = new FormGroup({
              id_materia: new FormControl('',[Validators.required]),
              fecha_cursado: new FormControl('',[Validators.required]),
              id_periodo: new FormControl(20211,[Validators.required])
            })
            this.slt_materia = null;
            this.emitirEvento();
          }
          else {
            alert('=/ ocurrio un problema,no se pudo registrar la materia, revise la conexión con el servidor o si la materia ya esta inscrita'); 
          }
        }
      ) 

    } 
  }

  emitirEvento(arg?){
    this.actualizacion.emit( this.contenido);
  }
}
