import { MatriculaService } from './../../services/matricula.service';
import { Component, OnInit,Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comp-materia',
  templateUrl: './comp-materia.component.html',
  styleUrls: ['./comp-materia.component.css']
})
export class CompMateriaComponent implements OnInit {
  
  @Input() modo_edicion;
  @Input() id_alumno;
  @Input() id_carrera;
  @Input() id_inscripcion;

  materias;
  edicion = false;
  ins_mat = false;
  data_edicion;
  constructor(private servicioMatricula: MatriculaService,
       ) { }

  ngOnInit(): void {(
    this.getInsMateriasAlumno()
  )}

  editarMateria(materia, contenido){
    
    if(this.edicion && this.data_edicion  == materia){
      this.edicion = false
      this.data_edicion = null
      
    }
    else {
      this.edicion = true
      this.data_edicion  = materia;
    }

  }

  getInsMateriasAlumno(arg?){
    this.servicioMatricula.getMAteriasAlumno(this.id_alumno,this.id_carrera, this.id_inscripcion).subscribe((data)=>{
      this.materias = data;
      this.edicion = false;
    })
  }
  
  eliminarMateria(materia){
    let plantilla = {
      id_alumno:  this.id_alumno,
      id_carrera: this.id_carrera,
      id_inscripcion: this.id_inscripcion,
      id_materia: materia.id_materia,
      id_periodo: materia.id_periodo,
    }

    this.servicioMatricula.deleteMateriaInscrita(plantilla).subscribe(
    () =>{},
    (data) =>{
      if(data.status == "200"){
        this.getInsMateriasAlumno();
        alert('materia eliminada exitosamente');
      }
      else alert('algo salio mal!, podria ser la conexión a internet'); 
    })

  }

}
