import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'src/Service/publication.service';
import { Publication } from 'src/Model/Publication';
import { SousCategorie } from 'src/Model/SousCategorie';
import { SousCategorieService } from 'src/Service/souscategorie.service';
import { v4 as uuidv4 } from 'uuid'; // Importer uuid pour générer des ID uniques

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent implements OnInit {
  publication: Publication = {
    id: '',  // L'ID sera généré dynamiquement
    titre: '',
    description: '',
    prix: 0,
    date_pub: '',  // À initialiser avec la date actuelle
    sousCategorieId: '',
    prestataireId: '',
    statut: 'inactive' // Statut "inactive" par défaut
  };

  sousCategories: SousCategorie[] = [];
  selectedSousCategorie: string = '';

  constructor(
    private publicationService: PublicationService,
    private sousCategorieService: SousCategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    // Initialisation de la date de publication avec la date d'aujourd'hui
    const today = new Date();
    this.publication.date_pub = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser) {
      this.publication.prestataireId = currentUser.id;
    }
    this.loadSousCategories();
  }

  loadSousCategories(): void {
    this.sousCategorieService.getSousCategories().subscribe(
      (data: SousCategorie[]) => {
        this.sousCategories = data;
      }
    );
  }

  ajouterPublication(): void {
    const sousCategorieSelectionnee = this.sousCategories.find(sc => sc.nomscat === this.selectedSousCategorie);
    if (sousCategorieSelectionnee) {
      this.publication.sousCategorieId = sousCategorieSelectionnee.id || '';
    } else {
      console.error("Sous-catégorie non trouvée !");
      return;
    }

    this.publication.id = uuidv4(); // 🎯 Générer un ID unique avant l'envoi

    this.publicationService.ajouterPublication(this.publication).subscribe(
      (response) => {
        console.log('Publication ajoutée', response);
        this.router.navigate(['/Postview']); // Rediriger vers la page de visualisation des publications
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la publication", error);
      }
    );
  }
}
