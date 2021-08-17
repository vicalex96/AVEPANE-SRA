import { PerfilDocumentosAlumnoComponent } from './componentes/perfil-documentos-alumno/perfil-documentos-alumno.component';

import { CompMatActualizarCursadaComponent } from './componentes/comp-materia/comp-mat-actualizar-cursada/comp-mat-actualizar-cursada.component';
import { CompMatInscribirMatComponent } from './componentes/comp-materia/comp-mat-inscribir/comp-mat-inscribir.component';
import { CompMateriaComponent } from './componentes/comp-materia/comp-materia.component';
import { PerfilMatriculaModule } from './matricula/perfil-matricula/perfil-matricula.module';
import { PerfilMatriculaComponent } from './matricula/perfil-matricula/perfil-matricula.component';
import { MatriculaModule } from './matricula/matricula.module';
import { RegistrarPerfilModule } from './registro/registrar-perfil/registrar-perfil.module';
import { RegistrarPerfilComponent } from './registro/registrar-perfil/registrar-perfil.component';

import { RegistrarAlumnoComponent } from './registro/registrar-alumno/registrar-alumno.component';
import { RegistrarAlumnoModule } from './registro/registrar-alumno/registrar-alumno.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PerfilConsultaComponent } from './consulta/perfil-consulta/perfil-consulta.component';
import { PerfilConsultaModule } from './consulta/perfil-consulta/perfil-consulta.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarrerasModule } from './carreras/carreras.module';
import { NuevosEstudiantesModule } from './nuevos-estudiantes/nuevos-estudiantes.module';
import { InicioComponent } from './inicio/inicio.component';
import { InicioModule } from './inicio/inicio.module';
import { NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ComponentesComponent } from './componentes/componentes.component';
import { PagPrincipalComponent } from './pag-principal/pag-principal.component';
import { PagPrincipalModule } from './pag-principal/pag-principal.module';
import { MenuComponent } from './componentes/menu/menu.component';

import { HttpClientModule } from '@angular/common/http';
import { PaginatePipe } from './pipes/paginate.pipe';
import { PerfilInfoAlumnoComponent } from './componentes/perfil-info-alumno/perfil-info-alumno.component';
import { PerfilInscripcionAlumnoComponent } from './componentes/perfil-inscripcion-alumno/perfil-inscripcion-alumno.component';
import { PerfilTelefonoAlumnoComponent } from './componentes/perfil-telefono-alumno/perfil-telefono-alumno.component';
import { FiltroBusquedaPipe } from './pipes/filtro-busqueda.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroCarreraPipe } from './pipes/filtro-carrera.pipe';
import { AgregarInsComponent } from './componentes/perfil-inscripcion-alumno/agregar-ins/agregar-ins.component';
import { AgregaTelfComponent } from './componentes/perfil-telefono-alumno/agregar-tlf/agregar-tlf.component';
import { AgrearDocComponent } from './componentes/perfil-documentos-alumno/agrear-doc/agrear-doc.component';

import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultaModule } from './consulta/consulta.module';
import { ListadoAlumnosComponent } from './componentes/listado-alumnos/listado-alumnos.component';
import { EditarInsComponent } from './componentes/perfil-inscripcion-alumno/editar-ins/editar-ins.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroModule } from './registro/registro.module';
import { MatriculaComponent } from './matricula/matricula.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComponentesComponent,
    RegistrarAlumnoComponent,
    PagPrincipalComponent,
    MenuComponent,
    RegistroComponent,
    PaginatePipe,
    PerfilInfoAlumnoComponent,
    PerfilInscripcionAlumnoComponent,
    PerfilTelefonoAlumnoComponent,
    FiltroBusquedaPipe,
    FiltroCarreraPipe,
    AgregarInsComponent,
    AgregaTelfComponent,
    AgrearDocComponent,
    CompMateriaComponent,
    CompMatInscribirMatComponent,
    CompMatActualizarCursadaComponent,
    ConsultaComponent,
    ListadoAlumnosComponent,
    RegistrarPerfilComponent,
    PerfilConsultaComponent,
    EditarInsComponent,
    MatriculaComponent,
    PerfilMatriculaComponent,
    PerfilDocumentosAlumnoComponent,
    


  ],
  imports: [
    FormsModule,
    PerfilConsultaModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserModule,
    CarrerasModule,
    NuevosEstudiantesModule,
    InicioModule,
    PagPrincipalModule,
    PerfilConsultaModule,
    ConsultaModule,
    RegistrarAlumnoModule,
    RegistroModule,
    RegistrarPerfilModule,
    MatriculaModule,
    PerfilMatriculaModule,
    
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
