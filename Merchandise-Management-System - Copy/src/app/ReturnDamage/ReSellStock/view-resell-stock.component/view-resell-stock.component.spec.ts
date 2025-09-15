import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResellStockComponent } from './view-resell-stock.component';

describe('ViewResellStockComponent', () => {
  let component: ViewResellStockComponent;
  let fixture: ComponentFixture<ViewResellStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewResellStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResellStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
