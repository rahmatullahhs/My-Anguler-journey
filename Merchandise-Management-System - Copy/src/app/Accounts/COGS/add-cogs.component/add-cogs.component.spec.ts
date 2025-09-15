import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCogsComponent } from './add-cogs.component';

describe('AddCogsComponent', () => {
  let component: AddCogsComponent;
  let fixture: ComponentFixture<AddCogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
