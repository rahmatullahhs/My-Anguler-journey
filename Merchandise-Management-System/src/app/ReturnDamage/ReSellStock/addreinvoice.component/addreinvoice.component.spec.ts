import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreinvoiceComponent } from './addreinvoice.component';

describe('AddreinvoiceComponent', () => {
  let component: AddreinvoiceComponent;
  let fixture: ComponentFixture<AddreinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddreinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddreinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
