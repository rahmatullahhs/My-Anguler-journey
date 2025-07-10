import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewcategory } from './viewcategory';

describe('Viewcategory', () => {
  let component: Viewcategory;
  let fixture: ComponentFixture<Viewcategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewcategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewcategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
