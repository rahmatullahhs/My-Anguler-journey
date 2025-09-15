import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResellStockComponent } from './add-resell-stock.component';

describe('AddResellStockComponent', () => {
  let component: AddResellStockComponent;
  let fixture: ComponentFixture<AddResellStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddResellStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResellStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
