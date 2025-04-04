import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/Model/Categorie';
import { SousCategorie } from 'src/Model/SousCategorie';
import { CategorieService } from 'src/Service/categorie.service';
import { SousCategorieService } from 'src/Service/souscategorie.service';

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

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private sousCategorieService: SousCategorieService
  ) {}

  ngOnInit(): void {
    this.sousCategorieForm = this.fb.group({
      nomscat: new FormControl('', Validators.required),
      categorieId: new FormControl('', Validators.required)
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories', err);
      }
    });
  }

  ajouterSousCategorie(): void {
    if (this.sousCategorieForm.invalid) {
      return;
    }

    const sousCategorie: SousCategorie = this.sousCategorieForm.value;

    this.sousCategorieService.ajouterSousCategorie(sousCategorie).subscribe({
      next: () => {
        this.successMessage = 'Sous-catégorie ajoutée avec succès';
        this.sousCategorieForm.reset();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout de la sous-catégorie';
        console.error(err);
      }
    });
  }
}
