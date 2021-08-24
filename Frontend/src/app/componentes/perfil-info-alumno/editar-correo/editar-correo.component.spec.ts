import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCorreoComponent } from './editar-correo.component';

describe('EditarCorreoComponent', () => {
  let component: EditarCorreoComponent;
  let fixture: ComponentFixture<EditarCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
