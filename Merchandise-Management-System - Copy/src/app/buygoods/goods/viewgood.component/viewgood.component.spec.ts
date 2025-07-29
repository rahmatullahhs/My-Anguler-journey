import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgoodComponent } from './viewgood.component';

describe('ViewgoodComponent', () => {
  let component: ViewgoodComponent;
  let fixture: ComponentFixture<ViewgoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewgoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewgoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
