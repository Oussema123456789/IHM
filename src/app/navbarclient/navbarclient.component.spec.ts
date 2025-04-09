import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarclientComponent } from './navbarclient.component';

describe('NavbarclientComponent', () => {
  let component: NavbarclientComponent;
  let fixture: ComponentFixture<NavbarclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarclientComponent]
    });
    fixture = TestBed.createComponent(NavbarclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
