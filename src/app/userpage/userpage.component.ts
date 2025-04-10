import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/Service/portfolio.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  userId: string | null = null;
  user: any = {}; // Infos utilisateur/Prestataire
  portfolio = {
    description: '',
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    // Récupère l’ID depuis l’URL
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id'); // <-- L’ID dans /userpage/:id
      if (this.userId) {
        this.getUserPortfolio();
      }
    });
  }

  // Récupérer les infos utilisateur et son portfolio
  getUserPortfolio(): void {
    if (!this.userId) return;

    this.portfolioService.getUser(this.userId).subscribe({
      next: (data) => {
        console.log('Utilisateur récupéré:', data);
        this.user = data;

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
