import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeclientComponent } from './welcomeclient.component';

describe('WelcomeclientComponent', () => {
  let component: WelcomeclientComponent;
  let fixture: ComponentFixture<WelcomeclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeclientComponent]
    });
    fixture = TestBed.createComponent(WelcomeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
