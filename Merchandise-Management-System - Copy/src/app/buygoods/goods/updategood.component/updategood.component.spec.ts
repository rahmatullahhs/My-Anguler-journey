import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategoodComponent } from './updategood.component';

describe('UpdategoodComponent', () => {
  let component: UpdategoodComponent;
  let fixture: ComponentFixture<UpdategoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdategoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdategoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
