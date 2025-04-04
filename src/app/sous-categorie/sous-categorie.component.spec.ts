import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategorieComponent } from './sous-categorie.component';

describe('SousCategorieComponent', () => {
  let component: SousCategorieComponent;
  let fixture: ComponentFixture<SousCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousCategorieComponent]
    });
    fixture = TestBed.createComponent(SousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
