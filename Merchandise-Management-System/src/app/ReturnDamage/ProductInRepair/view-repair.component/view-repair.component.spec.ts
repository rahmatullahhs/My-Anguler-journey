import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepairComponent } from './view-repair.component';

describe('ViewRepairComponent', () => {
  let component: ViewRepairComponent;
  let fixture: ComponentFixture<ViewRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRepairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
