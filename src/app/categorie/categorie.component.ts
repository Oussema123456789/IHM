import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/Model/Categorie';
import { CategorieService } from 'src/Service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: Categorie[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      this.categories = (await this.categorieService.getCategories().toPromise()) || [];
    } catch (error) {
      this.errorMessage = 'Erreur de chargement des catégories';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async supprimerCategorie(id: string): Promise<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await this.categorieService.supprimerCategorie(id).toPromise();
        this.categories = this.categories.filter(cat => cat.id !== id);
      } catch (error) {
        alert('Erreur lors de la suppression');
        console.error(error);
      }
    }
  }
}
