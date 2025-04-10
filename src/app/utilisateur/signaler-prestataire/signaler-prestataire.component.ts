import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/Service/utilisateur.service';

@Component({
  selector: 'app-signaler-prestataire',
  templateUrl: './signaler-prestataire.component.html',
  styleUrls: ['./signaler-prestataire.component.css']
})
export class SignalerPrestataireComponent implements OnInit {
  id!: number;
  alertMessage: string = '';  // Message d'alerte

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.utilisateurService.signalerPrestataire(this.id).subscribe(
      () => {
        this.alertMessage = 'Prestataire signalé avec succès'; // Définir le message
        setTimeout(() => {
          this.router.navigate(['/utilisateur/liste']);  // Redirection après un délai pour voir l'alerte
        }, 4000);  // Attendre 2 secondes avant la redirection
      },
      (error) => {
        console.error('Erreur lors du signalement', error);
        this.alertMessage = 'Une erreur est survenue lors du signalement';
      }
    );
  }
}
