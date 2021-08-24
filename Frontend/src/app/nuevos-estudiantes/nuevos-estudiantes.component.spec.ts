import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosEstudiantesComponent } from './nuevos-estudiantes.component';

describe('NuevosEstudiantesComponent', () => {
  let component: NuevosEstudiantesComponent;
  let fixture: ComponentFixture<NuevosEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevosEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevosEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
