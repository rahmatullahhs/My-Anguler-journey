import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategoodsComponent } from './updategoods.component';

describe('UpdategoodsComponent', () => {
  let component: UpdategoodsComponent;
  let fixture: ComponentFixture<UpdategoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdategoodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdategoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
