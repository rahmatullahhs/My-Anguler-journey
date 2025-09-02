import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sellpage } from './sellpage';

describe('Sellpage', () => {
  let component: Sellpage;
  let fixture: ComponentFixture<Sellpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sellpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sellpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
