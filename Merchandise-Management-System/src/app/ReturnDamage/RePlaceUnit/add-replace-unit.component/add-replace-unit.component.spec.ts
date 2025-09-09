import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReplaceUnitComponent } from './add-replace-unit.component';

describe('AddReplaceUnitComponent', () => {
  let component: AddReplaceUnitComponent;
  let fixture: ComponentFixture<AddReplaceUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReplaceUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReplaceUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
