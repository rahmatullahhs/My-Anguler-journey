import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billstracking } from './billstracking';

describe('Billstracking', () => {
  let component: Billstracking;
  let fixture: ComponentFixture<Billstracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Billstracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Billstracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
