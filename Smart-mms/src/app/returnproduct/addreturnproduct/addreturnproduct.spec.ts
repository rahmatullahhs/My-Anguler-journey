import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addreturnproduct } from './addreturnproduct';

describe('Addreturnproduct', () => {
  let component: Addreturnproduct;
  let fixture: ComponentFixture<Addreturnproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addreturnproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addreturnproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
