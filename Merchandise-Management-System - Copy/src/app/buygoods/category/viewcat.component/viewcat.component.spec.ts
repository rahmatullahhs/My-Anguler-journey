import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcatComponent } from './viewcat.component';

describe('ViewcatComponent', () => {
  let component: ViewcatComponent;
  let fixture: ComponentFixture<ViewcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewcatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
