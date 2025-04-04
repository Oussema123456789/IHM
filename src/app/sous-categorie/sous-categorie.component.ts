import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SousCategorie } from 'src/Model/SousCategorie';
import { SousCategorieService } from 'src/Service/souscategorie.service';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.css']
})
export class SousCategorieComponent implements OnInit {
  sousCategories: SousCategorie[] = [];
  categorieId!: string;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private sousCategorieService: SousCategorieService
  ) {}

  ngOnInit(): void {
    this.categorieId = this.route.snapshot.paramMap.get('id')!;
    if (this.categorieId) {
      this.getSousCategories();
    } else {
      this.errorMessage = "Catégorie introuvable";
    }
  }

  getSousCategories(): void {
    this.loading = true;
    this.sousCategorieService.getSousCategoriesByCategorieId(this.categorieId).subscribe({
      next: (data) => {
        this.sousCategories = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des sous-catégories';
        console.error(err);
        this.loading = false;
      }
    });
  }

  supprimerSousCategorie(id?: string): void {
    if (!id) {
      alert('ID invalide, impossible de supprimer.');
      return;
    }
  
    if (confirm('Voulez-vous vraiment supprimer cette sous-catégorie ?')) {
      this.sousCategorieService.supprimerSousCategorie(id).subscribe({
        next: () => {
          this.sousCategories = this.sousCategories.filter(sc => sc.id !== id);
        },
        error: () => {
          alert('Erreur lors de la suppression de la sous-catégorie');
        }
      });
    }
  }
  
}
