import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'src/Service/publication.service';
import { NotificationService } from 'src/Service/notif.service';
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
    region: '',
    sousCategorieId: '',
    prestataireId: '',
    statut: 'en_attente'
  };

  sousCategories: SousCategorie[] = [];
  selectedSousCategorie: string = '';
  isPrestataire: boolean = false;
  messageSuccess: string | null = null;

  regions: string[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba',
    'Nabeul', 'Zaghouan', 'Bizerte', 'Béja',
    'Jendouba', 'Kef', 'Siliana', 'Sousse',
    'Monastir', 'Mahdia', 'Kairouan', 'Kasserine',
    'Sidi Bouzid', 'Sfax', 'Gabès', 'Medenine',
    'Tataouine', 'Tozeur', 'Kebili', 'Gafsa'
  ];

  @Input() prestataireId!: string;

  constructor(
    private publicationService: PublicationService,
    private sousCategorieService: SousCategorieService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log("Ajout pour prestataire :", this.prestataireId);
  
    const today = new Date();
    this.publication.date_pub = today.toLocaleDateString('fr-FR'); // Format français sans l'heure
  
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
        const notification = {
          message: `Une nouvelle publication a été ajoutée par ${this.publication.prestataireId}. Elle attend la validation de l'administrateur.`,
          type: 'validation',
          publicationId: this.publication.id,
          userId: 'admin',
        };

        this.notificationService.createNotification(notification).subscribe(
          () => {
            console.log('Notification envoyée à l\'admin');
          },
          (error) => {
            console.error('Erreur lors de l\'envoi de la notification', error);
          }
        );

        this.messageSuccess = "✅ Votre publication a été soumise avec succès et attend la validation de l'administrateur.";

        // Redirection après 3 seconde
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la publication", error);
      }
    );
  }
}
