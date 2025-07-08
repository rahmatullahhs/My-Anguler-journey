import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addemp } from './addemp';

describe('Addemp', () => {
  let component: Addemp;
  let fixture: ComponentFixture<Addemp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addemp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addemp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
