import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAPI_URL} from './api-conection.js';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private http: HttpClient) { }

  
  getCarreras(){
    return this.http.get( getAPI_URL() +'/carreras');
  }

  getMaterias(id_carrera){
    return this.http.get( getAPI_URL() +'/materias/carrera/?id_carrera='+id_carrera);
  }
  getMAteriasAlumno(id_alumno,id_carrera,id_inscripcion){
    return this.http.get( getAPI_URL() +'/materias/alumno/?id_alumno='+id_alumno+'&id_carrera='+id_carrera+'&id_inscripcion='+id_inscripcion);
  }

  deleteMateriaInscrita(data){
    return this.http.post( getAPI_URL() +'/materia/cursada/eliminar/',data);
  }
  
  getPeriodos(){
    return this.http.get( getAPI_URL() +'/periodos/');
  }
  insertMateriaACursar(data){
    return this.http.post( getAPI_URL() +'/materia/cursar',data);
  }
  actualizarMateriaCursada(data){
    return this.http.post( getAPI_URL() +'/materia/cursada/actualizar',data);
  }

  insertInscripcion(data){
    return this.http.post( getAPI_URL() +'/inscripcion/registrar/',data);
  }

  actualizarInscripcion(data){
    return this.http.post( getAPI_URL() +'/inscripcion/actualizar/',data);
  }

  agregarDocInscripcion(data){
    console.log('hola')
    return this.http.post( getAPI_URL() +'/documento-agregar',data);
  }
  
  eliminarDocInscripcion(data){
    return this.http.post( getAPI_URL() +'/documento-eliminar',data);
  }
  
  
}
