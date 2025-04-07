import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Service/auth.service'; // Service d'authentification
import { NotificationService } from 'src/Service/notif.service'; // Service de notification
import { PublicationService } from 'src/Service/publication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any = null;  // Utilisateur actuel
  notifications: any[] = [];  // Notifications de l'utilisateur
  notificationsCount: number = 0;  // Compteur de notifications "en_attente"

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private publicationService: PublicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();  // Récupérer l'utilisateur actuel
    this.loadNotifications();  // Charger les notifications au démarrage

    // Mettre à jour les notifications toutes les 30 secondes (optionnel)
    setInterval(() => this.loadNotifications(), 30000);
  }

  // Charger les notifications de l'utilisateur
  loadNotifications(): void {
    if (this.user) {
      if (this.user.role === 'admin') {
        // Récupérer toutes les publications avec statut "en_attente"
        this.publicationService.getPublications().subscribe(
          (publications) => {
            this.notifications = publications.filter(
              (publication) => publication.statut === 'en_attente'
            );
            this.notificationsCount = this.notifications.length;  // Compter les notifications en attente
          },
          (error) => {
            console.error('Erreur lors du chargement des publications', error);
          }
        );
      } else if (this.user.role === 'prestataire') {
        // Récupérer les notifications pour un prestataire spécifique
        this.notificationService.getNotifications(this.user.id).subscribe(
          (notifications) => {
            this.notifications = notifications.filter(
              (notification) => notification.prestataireId === this.user.id
            );
            this.notificationsCount = this.notifications.length;  // Compter les notifications pour ce prestataire
          },
          (error) => {
            console.error('Erreur lors du chargement des notifications', error);
          }
        );
      }
    }
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    this.authService.logout();
  }

  // Redirection vers la page de validation
  redirectToValidation(notification: any): void {
    // Vérification du type de notification et redirection dynamique en fonction de ce type
    if (notification.type === 'validation') {
      // Exemple de redirection vers la page de validation de publication avec un ID dynamique
      this.router.navigate([`/admin-validations/${notification.publicationId}`]);
    } else {
      // Rediriger vers une page par défaut ou montrer un message d'erreur
      console.log('Notification type non reconnu');
    }
  }
}