import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showreport } from './showreport';

describe('Showreport', () => {
  let component: Showreport;
  let fixture: ComponentFixture<Showreport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showreport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showreport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
