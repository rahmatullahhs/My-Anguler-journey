import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReplaceUnitComponent } from './view-replace-unit.component';

describe('ViewReplaceUnitComponent', () => {
  let component: ViewReplaceUnitComponent;
  let fixture: ComponentFixture<ViewReplaceUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReplaceUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReplaceUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
