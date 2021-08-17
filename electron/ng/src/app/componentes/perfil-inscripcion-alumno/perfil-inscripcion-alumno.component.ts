import { MatriculaService } from './../../services/matricula.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-inscripcion-alumno',
  templateUrl: './perfil-inscripcion-alumno.component.html',
  styleUrls: ['./perfil-inscripcion-alumno.component.css']
})
export class PerfilInscripcionAlumnoComponent implements OnInit {
  
  @Input() modo_edicion;
  @Input() documentos;
  @Input() inscripcion;
  @Input() id_alumno;
  inscribir = false;
  editar = false; 
  constructor(private servicioMatricula: MatriculaService) { }

  ngOnInit(): void {
  }

}
