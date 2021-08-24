import { AlumnoService } from './../../services/alumno.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-perfil-telefono-alumno',
  templateUrl: './perfil-telefono-alumno.component.html',
  styleUrls: ['./perfil-telefono-alumno.component.css']
})
export class PerfilTelefonoAlumnoComponent implements OnInit {
  @Input() modo_edicion;
  @Input() telefonos;
  @Input() id_alumno;
  @Output() actualizacion: EventEmitter<any> = new EventEmitter();
  contenido;

  en_edicion = false;
  constructor(private servicioAlumno: AlumnoService) { }

  ngOnInit(): void {
  }
  formatear_numero(numero){
    let cadena = numero +'';
    let primera_parte = cadena.substring(0,3);
    let segunda_aprte = cadena.substring(3,cadena.length);
    cadena = primera_parte + '-' + segunda_aprte;
    return cadena;
  }

  eliminarTlf(id){
    this.servicioAlumno.eliminarTelefono(this.id_alumno,id).subscribe(
      () =>{},
      (data) =>{
        if(data.status == "200"){
          console.log('todo bien');
          this.emitirEvento();
        }
        else console.log('algo salio mal!'); 
      }
    )
  }

  
  emitirEvento(arg?){
    console.log('evento activado lista de telefonos')
    this.actualizacion.emit( this.contenido);
  }
}
