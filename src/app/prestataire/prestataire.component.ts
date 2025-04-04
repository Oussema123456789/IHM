import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Service/auth.service';
 // Remplace par le chemin réel de ton service

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.css']
})
export class PrestataireComponent implements OnInit {
  userId: string = '';  // Pour stocker l'ID de l'utilisateur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est un prestataire
    if (this.authService.isPrestataire()) {
      const currentUser = this.authService.getUser();
      this.userId = currentUser.id;  // Récupérer l'ID de l'utilisateur
    } else {
      this.router.navigate(['/login']);  // Si non prestataire, rediriger vers la page de login
    }
  }

  // Méthode pour rediriger vers la page d'ajout de publication
  redirectToAddPublication() {
    this.router.navigate([`/ajouter-publication/${this.userId}`]);  // Rediriger vers la page d'ajout publication avec l'ID
  }
}
