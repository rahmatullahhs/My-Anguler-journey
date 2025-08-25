import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportComponents } from './support.components';

describe('SupportComponents', () => {
  let component: SupportComponents;
  let fixture: ComponentFixture<SupportComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
