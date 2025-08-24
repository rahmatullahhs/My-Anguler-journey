import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponents } from './faq.components';

describe('FaqComponents', () => {
  let component: FaqComponents;
  let fixture: ComponentFixture<FaqComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
