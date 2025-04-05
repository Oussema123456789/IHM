import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPublicationComponent } from './modifier-publication.component';

describe('ModifierPublicationComponent', () => {
  let component: ModifierPublicationComponent;
  let fixture: ComponentFixture<ModifierPublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierPublicationComponent]
    });
    fixture = TestBed.createComponent(ModifierPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
