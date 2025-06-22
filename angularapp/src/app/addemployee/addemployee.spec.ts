import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addemployee } from './addemployee';

describe('Addemployee', () => {
  let component: Addemployee;
  let fixture: ComponentFixture<Addemployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addemployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addemployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
