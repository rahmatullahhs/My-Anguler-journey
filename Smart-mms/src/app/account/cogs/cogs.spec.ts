import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cogs } from './cogs';

describe('Cogs', () => {
  let component: Cogs;
  let fixture: ComponentFixture<Cogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
