// Exemple dans modifier-publication.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Publication } from 'src/Model/Publication';
import { PublicationService } from 'src/Service/publication.service';
import { SousCategorie } from 'src/Model/SousCategorie';
import { SousCategorieService } from 'src/Service/souscategorie.service';

@Component({
  selector: 'app-modifier-publication',
  templateUrl: './modifier-publication.component.html',
  styleUrls: ['./modifier-publication.component.css']
})
export class ModifierPublicationComponent implements OnInit {

  publication: Publication = {
    id: '',
    titre: '',
    description: '',
    prix: 0,
    region: '', // ← Ajouté ici

    date_pub: '',
    sousCategorieId: '',
    prestataireId: '',
    statut: 'inactive'
  };

  sousCategories: SousCategorie[] = [];
  selectedSousCategorie: string = '';
  regions: string[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba',
    'Nabeul', 'Zaghouan', 'Bizerte', 'Béja',
    'Jendouba', 'Kef', 'Siliana', 'Sousse',
    'Monastir', 'Mahdia', 'Kairouan', 'Kasserine',
    'Sidi Bouzid', 'Sfax', 'Gabès', 'Medenine',
    'Tataouine', 'Tozeur', 'Kebili', 'Gafsa'
  ];
  
  constructor(
    private publicationService: PublicationService,
    private sousCategorieService: SousCategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID depuis la route (doit être une chaîne)
    const publicationId = this.route.snapshot.paramMap.get('id');
    if (!publicationId) {
      console.error("Aucun ID de publication trouvé dans l'URL");
      return;
    }

    // Charger simultanément la publication et les sous-catégories
    forkJoin({
      pub: this.publicationService.getPublicationById(publicationId),
      sousCats: this.sousCategorieService.getSousCategories()
    }).subscribe({
      next: ({ pub, sousCats }) => {
        this.publication = pub;
        this.sousCategories = sousCats;
        const found = this.sousCategories.find(sc => sc.id === this.publication.sousCategorieId);
        this.selectedSousCategorie = found ? found.nomscat : '';
      },
      error: err => {
        console.error("Erreur lors du chargement des données", err);
      }
    });
  }

  modifierPublication(): void {
    const sousCategorieSelectionnee = this.sousCategories.find(sc => sc.nomscat === this.selectedSousCategorie);
    if (sousCategorieSelectionnee) {
      this.publication.sousCategorieId = sousCategorieSelectionnee.id!;
    } else {
      console.error("Sous-catégorie non trouvée !");
      return;
    }

    this.publicationService.modifierPublication(this.publication).subscribe({
      next: response => {
        console.log('Publication mise à jour', response);
        this.router.navigate(['/Postview']); // Rediriger vers la page de visualisation des publications
      },
      error: error => {
        console.error("Erreur lors de la mise à jour de la publication", error);
      }
    });
  }
}
