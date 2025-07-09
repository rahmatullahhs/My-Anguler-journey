import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallproduct } from './viewallproduct';

describe('Viewallproduct', () => {
  let component: Viewallproduct;
  let fixture: ComponentFixture<Viewallproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
