import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSousCategorieComponent } from './modifier-sous-categorie.component';

describe('ModifierSousCategorieComponent', () => {
  let component: ModifierSousCategorieComponent;
  let fixture: ComponentFixture<ModifierSousCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierSousCategorieComponent]
    });
    fixture = TestBed.createComponent(ModifierSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
