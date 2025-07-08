import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateemp } from './updateemp';

describe('Updateemp', () => {
  let component: Updateemp;
  let fixture: ComponentFixture<Updateemp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Updateemp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateemp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
