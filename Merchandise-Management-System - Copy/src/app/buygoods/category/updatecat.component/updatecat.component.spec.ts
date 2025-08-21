import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecatComponent } from './updatecat.component';

describe('UpdatecatComponent', () => {
  let component: UpdatecatComponent;
  let fixture: ComponentFixture<UpdatecatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatecatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
