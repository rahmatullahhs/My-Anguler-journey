import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatesupplier } from './updatesupplier';

describe('Updatesupplier', () => {
  let component: Updatesupplier;
  let fixture: ComponentFixture<Updatesupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Updatesupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatesupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
