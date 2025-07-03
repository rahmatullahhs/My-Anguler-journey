import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopList } from './laptop-list';

describe('LaptopList', () => {
  let component: LaptopList;
  let fixture: ComponentFixture<LaptopList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaptopList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaptopList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
