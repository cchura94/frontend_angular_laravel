import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutpaginaComponent } from './layoutpagina.component';

describe('LayoutpaginaComponent', () => {
  let component: LayoutpaginaComponent;
  let fixture: ComponentFixture<LayoutpaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutpaginaComponent]
    });
    fixture = TestBed.createComponent(LayoutpaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
