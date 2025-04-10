import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalerPrestataireComponent } from './signaler-prestataire.component';

describe('SignalerPrestataireComponent', () => {
  let component: SignalerPrestataireComponent;
  let fixture: ComponentFixture<SignalerPrestataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalerPrestataireComponent]
    });
    fixture = TestBed.createComponent(SignalerPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
