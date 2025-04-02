import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/Model/Categorie';
import { CategorieService } from 'src/Service/categorie.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
  categorie: Categorie = { id: '', nomcat: '', image: '' }; // id est maintenant une string

  constructor(
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Garde id comme string
    if (id) {
      this.categorieService.getCategorieById(id).subscribe(
        (data) => {
          this.categorie = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la catégorie', error);
        }
      );
    }
  }

  updateCategorie(): void {
    this.categorieService.modifierCategorie(this.categorie).subscribe(
      () => {
        console.log('Catégorie mise à jour avec succès');
        this.router.navigate(['/Categorie']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour', error);
      }
    );
  }
}
