import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ledgerbook } from './ledgerbook';

describe('Ledgerbook', () => {
  let component: Ledgerbook;
  let fixture: ComponentFixture<Ledgerbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ledgerbook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ledgerbook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
