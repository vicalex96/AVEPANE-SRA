import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-info-alumno',
  templateUrl: './perfil-info-alumno.component.html',
  styleUrls: ['./perfil-info-alumno.component.css']
})
export class PerfilInfoAlumnoComponent implements OnInit {
  
  @Input() modo_edicion;
  @Input() alumno;
  constructor() { }

  ngOnInit(): void {
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
  }
}
