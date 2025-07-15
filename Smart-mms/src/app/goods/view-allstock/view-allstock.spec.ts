import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllstock } from './view-allstock';

describe('ViewAllstock', () => {
  let component: ViewAllstock;
  let fixture: ComponentFixture<ViewAllstock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllstock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllstock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
