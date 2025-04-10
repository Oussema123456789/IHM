import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid'; // ✅ Import ajouté
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
    private router: Router
  ) {}

  onAjouterCategorie() {
    if (this.nouvelleCategorie.nomcat) {
      this.nouvelleCategorie.id = uuidv4(); // ✅ Génération de l'ID ici

      this.categorieService.ajouterCategorie(this.nouvelleCategorie).subscribe(
        (categorie) => {
          console.log('Catégorie ajoutée avec succès:', categorie);
          this.router.navigate(['/Categorie']);
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
