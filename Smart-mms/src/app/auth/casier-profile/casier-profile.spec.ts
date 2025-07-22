import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasierProfile } from './casier-profile';

describe('CasierProfile', () => {
  let component: CasierProfile;
  let fixture: ComponentFixture<CasierProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CasierProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasierProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
