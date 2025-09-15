import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReturnProductComponent } from './view-return-product.component';

describe('ViewReturnProductComponent', () => {
  let component: ViewReturnProductComponent;
  let fixture: ComponentFixture<ViewReturnProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReturnProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReturnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
