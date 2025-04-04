import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/Service/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  userId: string | null = null;
  user: any = {}; // Stocker les infos utilisateur
  portfolio = {
    description: '',
    imageUrl: ''
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  // Charger les infos utilisateur depuis localStorage
  loadUserData(): void {
    const userData = localStorage.getItem('user'); // Récupère l'utilisateur connecté
    if (userData) {
      this.user = JSON.parse(userData);
      this.userId = this.user.id;
      this.getUserPortfolio();
    }
  }

  // Récupérer les infos utilisateur et son portfolio
  getUserPortfolio(): void {
    if (!this.userId) return;

    this.portfolioService.getUser(this.userId).subscribe({
      next: (data) => {
        console.log('Utilisateur récupéré:', data);
        this.user = data;

        // Vérifier si un portfolio existe
        if (data.portfolio) {
          this.portfolio.description = data.portfolio.description || '';
          this.portfolio.imageUrl = data.portfolio.imageUrl || '';
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du portfolio :", err);
      }
    });
  }

  // Sauvegarder les modifications du portfolio
  onSavePortfolio(): void {
    if (!this.userId) return;

    this.portfolioService.savePortfolio(this.userId, this.portfolio).subscribe({
      next: (data) => {
        console.log('Portfolio mis à jour avec succès', data);
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement du portfolio :", err);
      }
    });
  }

  // Gérer l'ajout/modification d'image
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.portfolio.imageUrl = reader.result as string;
      };
    }
  }
}
