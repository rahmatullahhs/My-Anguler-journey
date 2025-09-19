import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreinvoiceComponent } from './viewreinvoice.component';

describe('ViewreinvoiceComponent', () => {
  let component: ViewreinvoiceComponent;
  let fixture: ComponentFixture<ViewreinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewreinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewreinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
