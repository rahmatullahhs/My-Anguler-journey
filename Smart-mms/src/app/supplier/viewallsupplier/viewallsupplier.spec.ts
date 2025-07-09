import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallsupplier } from './viewallsupplier';

describe('Viewallsupplier', () => {
  let component: Viewallsupplier;
  let fixture: ComponentFixture<Viewallsupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallsupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallsupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
