import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catagories } from './catagories';

describe('Catagories', () => {
  let component: Catagories;
  let fixture: ComponentFixture<Catagories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Catagories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Catagories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
