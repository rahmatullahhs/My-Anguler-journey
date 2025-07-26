import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallorder } from './viewallorder';

describe('Viewallorder', () => {
  let component: Viewallorder;
  let fixture: ComponentFixture<Viewallorder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallorder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallorder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
