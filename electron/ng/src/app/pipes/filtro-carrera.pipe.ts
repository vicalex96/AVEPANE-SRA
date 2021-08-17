import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCarrera'
})
export class FiltroCarreraPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    
    for(const alumno of value){
      if(arg.toLocaleLowerCase() == 'inscritos' && alumno.carrera != '-'){
        resultado.push(alumno);
      }
      else if(alumno.carrera.toLocaleLowerCase().indexOf(arg.toLocaleLowerCase()) > -1 || arg == '*'){
        resultado.push(alumno);
      }
    };
    return resultado;
  };

}
