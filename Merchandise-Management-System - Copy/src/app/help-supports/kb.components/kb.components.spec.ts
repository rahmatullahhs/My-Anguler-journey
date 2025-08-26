import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KbComponents } from './kb.components';

describe('KbComponents', () => {
  let component: KbComponents;
  let fixture: ComponentFixture<KbComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KbComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KbComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
