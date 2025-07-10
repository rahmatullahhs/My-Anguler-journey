import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addbrand } from './addbrand';

describe('Addbrand', () => {
  let component: Addbrand;
  let fixture: ComponentFixture<Addbrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addbrand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addbrand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
