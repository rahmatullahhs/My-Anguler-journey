import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allemp } from './allemp';

describe('Allemp', () => {
  let component: Allemp;
  let fixture: ComponentFixture<Allemp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Allemp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allemp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
