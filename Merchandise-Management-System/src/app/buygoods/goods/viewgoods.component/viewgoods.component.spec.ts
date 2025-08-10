import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgoodsComponent } from './viewgoods.component';

describe('ViewgoodsComponent', () => {
  let component: ViewgoodsComponent;
  let fixture: ComponentFixture<ViewgoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewgoodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewgoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
