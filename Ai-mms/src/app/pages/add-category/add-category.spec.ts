import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategory } from './add-category';

describe('AddCategory', () => {
  let component: AddCategory;
  let fixture: ComponentFixture<AddCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
