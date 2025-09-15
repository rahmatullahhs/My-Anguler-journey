import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcogsComponent } from './viewcogs.component';

describe('ViewcogsComponent', () => {
  let component: ViewcogsComponent;
  let fixture: ComponentFixture<ViewcogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewcogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
