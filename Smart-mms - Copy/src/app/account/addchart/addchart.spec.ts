import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addchart } from './addchart';

describe('Addchart', () => {
  let component: Addchart;
  let fixture: ComponentFixture<Addchart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addchart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addchart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
