import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallemp } from './viewallemp';

describe('Viewallemp', () => {
  let component: Viewallemp;
  let fixture: ComponentFixture<Viewallemp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallemp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallemp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
