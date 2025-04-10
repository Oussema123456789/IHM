import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Categorie } from 'src/Model/Categorie';
import { SousCategorie } from 'src/Model/SousCategorie';
import { CategorieService } from 'src/Service/categorie.service';
import { SousCategorieService } from 'src/Service/souscategorie.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ajouter-sous-categorie',
  templateUrl: './ajouter-sous-categorie.component.html',
  styleUrls: ['./ajouter-sous-categorie.component.css']
})
export class AjouterSousCategorieComponent implements OnInit {
  sousCategorieForm!: FormGroup;
  categories: Categorie[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  categorieIdFromUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private categorieService: CategorieService,
    private sousCategorieService: SousCategorieService
  ) {}

  ngOnInit(): void {
    this.sousCategorieForm = this.fb.group({
      nomscat: new FormControl('', Validators.required),
      categorieId: new FormControl('', Validators.required)
    });

    this.categorieIdFromUrl = this.route.snapshot.paramMap.get('id') || '';
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (this.categories.length > 0 && this.categorieIdFromUrl) {
          const found = this.categories.find(cat => cat.id === this.categorieIdFromUrl);
          if (found) {
            this.sousCategorieForm.patchValue({
              categorieId: found.id
            });
          }
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories', err);
      }
    });
  }

  ajouterSousCategorie(): void {
    if (this.sousCategorieForm.invalid) return;

    const sousCategorie: SousCategorie = {
      id: uuidv4(),
      ...this.sousCategorieForm.value
    };

    this.sousCategorieService.ajouterSousCategorie(sousCategorie).subscribe({
      next: () => {
        this.successMessage = 'Sous-catégorie ajoutée avec succès';
        setTimeout(() => this.location.back(), 1000); // Retour à la page précédente
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout de la sous-catégorie';
        console.error(err);
      }
    });
  }

  getCategorieNomById(id: string): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.nomcat : '';
  }
}
