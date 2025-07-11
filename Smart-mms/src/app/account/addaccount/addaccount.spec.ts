import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addaccount } from './addaccount';

describe('Addaccount', () => {
  let component: Addaccount;
  let fixture: ComponentFixture<Addaccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addaccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addaccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
