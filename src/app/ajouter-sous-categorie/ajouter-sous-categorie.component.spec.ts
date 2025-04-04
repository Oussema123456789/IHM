import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSousCategorieComponent } from './ajouter-sous-categorie.component';

describe('AjouterSousCategorieComponent', () => {
  let component: AjouterSousCategorieComponent;
  let fixture: ComponentFixture<AjouterSousCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterSousCategorieComponent]
    });
    fixture = TestBed.createComponent(AjouterSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
