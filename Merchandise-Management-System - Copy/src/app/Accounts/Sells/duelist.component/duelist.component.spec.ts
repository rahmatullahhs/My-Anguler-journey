import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelistComponent } from './duelist.component';

describe('DuelistComponent', () => {
  let component: DuelistComponent;
  let fixture: ComponentFixture<DuelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
