import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/Service/publication.service';
import { SousCategorieService } from 'src/Service/souscategorie.service';
import { NotificationService } from 'src/Service/notif.service';
import { Publication } from 'src/Model/Publication';
import { SousCategorie } from 'src/Model/SousCategorie';
import { UtilisateurService } from 'src/Service/utilisateur.service';

@Component({
  selector: 'app-admin-validations',
  templateUrl: './admin-validations.component.html',
  styleUrls: ['./admin-validations.component.css']
})
export class AdminValidationsComponent implements OnInit {
  publicationsEnAttente: Publication[] = [];
  sousCategoriesMap: { [id: string]: string } = {};
  isLoading: boolean = true;
  utilisateursMap: { [key: string]: string } = {}; 

  constructor(
    private publicationService: PublicationService,
    private sousCategorieService: SousCategorieService,
    private notificationService: NotificationService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.chargerSousCategoriesEtPublications();
    this.chargerUtilisateurs();

  }

  chargerSousCategoriesEtPublications(): void {
    this.sousCategorieService.getSousCategories().subscribe(sousCats => {
      sousCats.forEach(sc => {
        if (sc.id) {
          this.sousCategoriesMap[sc.id] = sc.nomscat;
        }
      });

      this.getPublicationsEnAttente();
    });
  }

  getPublicationsEnAttente(): void {
    this.publicationService.getPublications().subscribe(publications => {
      this.publicationsEnAttente = publications.filter(pub => pub.statut === 'en_attente');
      this.isLoading = false;
    });
  }

  getNomSousCategorie(id: string): string {
    return this.sousCategoriesMap[id] || id;
  }

  accepterPublication(pub: Publication): void {
    pub.statut = 'active';
    this.publicationService.modifierPublication(pub).subscribe(() => {
      const notification = {
        userId: pub.prestataireId,
        message: `Votre publication "${pub.titre}" a été validée par l'administrateur.`,
        type: 'validation',
        publicationId: pub.id
      };

      this.notificationService.addNotification(notification).subscribe(() => {
        console.log('Notification envoyée au prestataire');
      });

      this.getPublicationsEnAttente();
    });
  }
  chargerUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs().subscribe(utilisateurs => {
      utilisateurs.forEach(user => {
        if (user.id) {
          this.utilisateursMap[user.id] = `${user.nom} `; // Adapté selon votre modèle
        }
      });
      this.getPublicationsEnAttente();
    });
  }

  refuserPublication(pub: Publication): void {
    pub.statut = 'refusee';
    this.publicationService.modifierPublication(pub).subscribe(() => {
      const notification = {
        userId: pub.prestataireId,
        message: `Votre publication "${pub.titre}" a été refusée par l'administrateur.`,
        type: 'validation',
        publicationId: pub.id
      };

      this.notificationService.addNotification(notification).subscribe(() => {
        console.log('Notification envoyée au prestataire');
      });

      this.getPublicationsEnAttente();
    });
  }
  getNomPrestataire(id: string): string {
    return this.utilisateursMap[id] || 'Inconnu';
  }
}
