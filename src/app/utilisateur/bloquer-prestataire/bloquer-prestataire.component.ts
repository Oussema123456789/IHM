import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/Service/utilisateur.service';

@Component({
  selector: 'app-bloquer-prestataire',
  templateUrl: './bloquer-prestataire.component.html',
  styleUrls: ['./bloquer-prestataire.component.css']
})
export class BloquerPrestataireComponent implements OnInit {
  id!: number;
  alertMessage: string = '';  // Message d'alerte

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.utilisateurService.bloquerPrestataire(this.id).subscribe(
      () => {
        this.alertMessage = 'Le compte a été bloqué avec succès'; // Message d'alerte
        setTimeout(() => {
          this.router.navigate(['/utilisateur/liste']); // Redirection après un délai
        }, 4000);  // Attendre 2 secondes avant de rediriger
      },
      (error) => {
        console.error('Erreur lors du blocage', error);
        this.alertMessage = 'Une erreur est survenue lors du blocage';
      }
    );
  }
}
