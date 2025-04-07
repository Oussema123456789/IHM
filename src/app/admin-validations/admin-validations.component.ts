import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/Service/publication.service';
import { Publication } from 'src/Model/Publication';
import { NotificationService } from 'src/Service/notif.service';  // Importez NotificationService

@Component({
  selector: 'app-admin-validations',
  templateUrl: './admin-validations.component.html',
  styleUrls: ['./admin-validations.component.css']
})
export class AdminValidationsComponent implements OnInit {
  publicationsEnAttente: Publication[] = [];
  isLoading: boolean = true;

  constructor(
    private publicationService: PublicationService,
    private notificationService: NotificationService  // Injectez NotificationService
  ) {}

  ngOnInit(): void {
    this.getPublicationsEnAttente();
  }

  getPublicationsEnAttente(): void {
    this.publicationService.getPublications().subscribe(publications => {
      this.publicationsEnAttente = publications.filter(pub => pub.statut === 'en_attente');
      this.isLoading = false;
    });
  }

  accepterPublication(pub: Publication): void {
    pub.statut = 'active';
    this.publicationService.modifierPublication(pub).subscribe(() => {
      // Envoyer une notification au prestataire
      const notification = {
        userId: pub.prestataireId,  // ID du prestataire
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

  refuserPublication(pub: Publication): void {
    pub.statut = 'refusee';
    this.publicationService.modifierPublication(pub).subscribe(() => {
      // Envoyer une notification au prestataire
      const notification = {
        userId: pub.prestataireId,  // ID du prestataire
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
}
