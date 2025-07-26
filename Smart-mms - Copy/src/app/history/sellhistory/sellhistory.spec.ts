import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sellhistory } from './sellhistory';

describe('Sellhistory', () => {
  let component: Sellhistory;
  let fixture: ComponentFixture<Sellhistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sellhistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sellhistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
