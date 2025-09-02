import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductspriceComponent } from './productsprice.component';

describe('ProductspriceComponent', () => {
  let component: ProductspriceComponent;
  let fixture: ComponentFixture<ProductspriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductspriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductspriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
