import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addentry } from './addentry';

describe('Addentry', () => {
  let component: Addentry;
  let fixture: ComponentFixture<Addentry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addentry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addentry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
