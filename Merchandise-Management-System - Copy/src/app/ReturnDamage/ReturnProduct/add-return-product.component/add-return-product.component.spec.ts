import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnProductComponent } from './add-return-product.component';

describe('AddReturnProductComponent', () => {
  let component: AddReturnProductComponent;
  let fixture: ComponentFixture<AddReturnProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReturnProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReturnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
