import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salestracking } from './salestracking';

describe('Salestracking', () => {
  let component: Salestracking;
  let fixture: ComponentFixture<Salestracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Salestracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salestracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
