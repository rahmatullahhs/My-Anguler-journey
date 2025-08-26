import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcheckoutComponent } from './addcheckout.component';

describe('AddcheckoutComponent', () => {
  let component: AddcheckoutComponent;
  let fixture: ComponentFixture<AddcheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
