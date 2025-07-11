import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addrepairproduct } from './addrepairproduct';

describe('Addrepairproduct', () => {
  let component: Addrepairproduct;
  let fixture: ComponentFixture<Addrepairproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addrepairproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addrepairproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
