import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquerPrestataireComponent } from './bloquer-prestataire.component';

describe('BloquerPrestataireComponent', () => {
  let component: BloquerPrestataireComponent;
  let fixture: ComponentFixture<BloquerPrestataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloquerPrestataireComponent]
    });
    fixture = TestBed.createComponent(BloquerPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
