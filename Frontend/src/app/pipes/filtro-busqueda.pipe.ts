import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBusqueda'
})
export class FiltroBusquedaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    for(const alumno of value){89
      if((alumno.nombre +' '+ alumno.segundo_nombre +' '+ alumno.apellido +' '+ alumno.segundo_apellido).toLocaleLowerCase().indexOf(arg.toLocaleLowerCase()) > -1){
        resultado.push(alumno);
      }
    };
    return resultado;
  };
}
