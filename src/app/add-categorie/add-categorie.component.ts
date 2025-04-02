import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/Model/Categorie';
import { CategorieService } from 'src/Service/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
  nouvelleCategorie: Categorie = { id: '', nomcat: '', image: '' };

  constructor(
    private categorieService: CategorieService,
    private router: Router // Injection du Router pour la navigation
  ) {}

  onAjouterCategorie() {
    if (this.nouvelleCategorie.nomcat) {
      this.categorieService.ajouterCategorie(this.nouvelleCategorie).subscribe(
        (categorie) => {
          console.log('Catégorie ajoutée avec succès:', categorie);
          this.router.navigate(['/Categorie']); // Redirection après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la catégorie:', error);
        }
      );
    } else {
      console.error('Le nom de la catégorie est requis.');
    }
  }
}
