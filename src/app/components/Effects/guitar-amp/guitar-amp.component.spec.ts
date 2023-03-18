import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarAmpComponent } from './guitar-amp.component';

describe('GuitarAmpComponent', () => {
  let component: GuitarAmpComponent;
  let fixture: ComponentFixture<GuitarAmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuitarAmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuitarAmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
