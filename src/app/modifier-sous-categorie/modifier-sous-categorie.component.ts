import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/Model/Categorie';
import { SousCategorie } from 'src/Model/SousCategorie';
import { CategorieService } from 'src/Service/categorie.service';
import { SousCategorieService } from 'src/Service/souscategorie.service';

@Component({
  selector: 'app-modifier-sous-categorie',
  templateUrl: './modifier-sous-categorie.component.html',
  styleUrls: ['./modifier-sous-categorie.component.css']
})
export class ModifierSousCategorieComponent implements OnInit {
  sousCategorie: SousCategorie = { id: '', nomscat: '', categorieId: '' };
  categories: Categorie[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sousCategorieService: SousCategorieService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getSousCategorie(id);
    }
    this.getCategories();
  }

  getSousCategorie(id: string): void {
    this.sousCategorieService.getSousCategorieById(id).subscribe({
      next: (data) => (this.sousCategorie = data),
      error: (err) => (this.errorMessage = 'Erreur lors du chargement de la sous-catégorie'),
    });
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.errorMessage = 'Erreur lors du chargement des catégories'),
    });
  }

  modifierSousCategorie(): void {
    this.sousCategorieService.modifierSousCategorie(this.sousCategorie).subscribe({
      next: () => this.router.navigate(['/sous-categorie']),
      error: (err) => (this.errorMessage = 'Erreur lors de la modification'),
    });
  }
}