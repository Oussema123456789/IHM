import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'src/Service/publication.service';
import { NotificationService } from 'src/Service/notif.service';  // Service de notification
import { Publication } from 'src/Model/Publication';
import { SousCategorie } from 'src/Model/SousCategorie';
import { SousCategorieService } from 'src/Service/souscategorie.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent implements OnInit {
  publication: Publication = {
    id: '',
    titre: '',
    description: '',
    prix: 0,
    date_pub: '',
    sousCategorieId: '',
    prestataireId: '',
    statut: 'en_attente' // ✅ La publication est en attente de validation
  };

  sousCategories: SousCategorie[] = [];
  selectedSousCategorie: string = '';
  isPrestataire: boolean = false;

  constructor(
    private publicationService: PublicationService,
    private sousCategorieService: SousCategorieService,
    private router: Router,
    private notificationService: NotificationService // Injecter le service de notification
  ) {}
  @Input() prestataireId!: string;
  ngOnInit(): void {
    console.log("Ajout pour prestataire :", this.prestataireId);

    const today = new Date();
    this.publication.date_pub = today.toISOString().split('T')[0];

    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser && currentUser.role === 'prestataire') {
      this.isPrestataire = true;
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

    this.publication.id = uuidv4();

    this.publicationService.ajouterPublication(this.publication).subscribe(
      (response) => {
        // Créer une notification pour l'admin après l'ajout de la publication
        const notification = {
          message: `Une nouvelle publication a été ajoutée par ${this.publication.prestataireId}. Elle attend la validation de l'administrateur.`,
          type: 'validation',  // Type de notification
          publicationId: this.publication.id,  // L'ID de la publication
          userId: 'admin',  // Vous pouvez ajuster cela selon l'ID de l'admin
        };

        // Envoyer la notification via le service de notification
        this.notificationService.createNotification(notification).subscribe(
          (response) => {
            console.log('Notification envoyée à l\'admin');
          },
          (error) => {
            console.error('Erreur lors de l\'envoi de la notification', error);
          }
        );

        alert("Votre publication a été soumise et attend la validation de l'administrateur.");
        this.router.navigate(['/Post']);
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la publication", error);
      }
    );
  }
}
