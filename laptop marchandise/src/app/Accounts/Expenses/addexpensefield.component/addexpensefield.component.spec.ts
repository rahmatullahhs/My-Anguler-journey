import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexpensefieldComponent } from './addexpensefield.component';

describe('AddexpensefieldComponent', () => {
  let component: AddexpensefieldComponent;
  let fixture: ComponentFixture<AddexpensefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddexpensefieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddexpensefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
