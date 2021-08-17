import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAPI_URL} from './api-conection.js';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  constructor(private http: HttpClient) { }

  getalumno(){
    return this.http.get(getAPI_URL() + '/clientes');
  }

  insertRegistro(data){
    let alumno = {
      cedula: data.cedula,
      tipo_cedula: data.tipo_cedula,
      nombre: data.nombre,
      nombre2: data.nombre2,
      apellido: data.apellido,
      apellido2: data.apellido2,
      genero: data.genero,
      fecha_nacimiento: data.fecha_nacimiento,
      email: data.email
    }
    return this.http.post(getAPI_URL() +'/alumno/registrar',alumno);
  }

  getAlumnos(){
    return this.http.get( getAPI_URL() +'/alumnos');
  }

  getAlumnosExt(data){
    return this.http.post( getAPI_URL() +'/alumnos',data);
  }

  getAlumno(id){
    return this.http.get( getAPI_URL() +'/alumno/?id='+id);
  }

  getInscripcion(id_alumno){
    return this.http.get( getAPI_URL() +'/inscripcion-actual/?id_alumno='+id_alumno);
  }
  
  getdocumento_faltantes(id_alumno,id_carrera,id_inscripcion){
    return this.http.get( getAPI_URL() +'/documentos/faltantes/?id_alumno='+id_alumno + '&id_carrera='+id_carrera+'&id_inscripcion='+id_inscripcion);
  }

  getdocumentos(id_alumno,id_carrera,id_inscripcion){
    return this.http.get( getAPI_URL() +'/documentos/?id_alumno='+id_alumno + '&id_carrera='+id_carrera+'&id_inscripcion='+id_inscripcion);
  }

  insertDocumento(data){
    return this.http.post( getAPI_URL() +'/documento',data);
  }

  getTelefonos(id_alumno){
    return this.http.get( getAPI_URL() +'/telefonos/?id_alumno='+id_alumno);
  }
  insertTelefono(data){
    return this.http.post( getAPI_URL() +'/telefono/registrar',data);
  }

  eliminarTelefono(id_alumno,id){
    return this.http.delete( getAPI_URL() +'/telefono/borrar/?id_alumno='+id_alumno+'&id='+id);
  }
}
