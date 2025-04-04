import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/Service/profile.service';
import { CloudinaryService } from 'src/Service/cloudinary.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = {
    nom: '',
    email: '',
    avatarUrl: 'https://via.placeholder.com/100x100.png',
    address: '',
    phone: '',
    city: '',
    role: '' // Assure-toi que le rôle est bien récupéré
  };

  constructor(
    private profileService: ProfileService,
    private cloudinaryService: CloudinaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfile();
    const storedUser = localStorage.getItem('user'); // Récupérer l'utilisateur stocké
    if (storedUser) {
      this.user = JSON.parse(storedUser); // Convertir la chaîne JSON en objet
      console.log('Rôle de l\'utilisateur:', this.user.role);
    }
  }

  getProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    this.profileService.getProfile(userId).subscribe({
      next: (data) => {
        console.log('Profil récupéré:', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil:', err);
      }
    });
  }
  getRoleFromLocalStorage(): void {
    const storedUser = localStorage.getItem('user'); // Supposons que l'utilisateur est stocké sous 'user'
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.user.role = parsedUser.role || ''; // Assigner le rôle s'il existe
    }
  }
  // Gestion du changement de fichier pour l'avatar
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (response) => {
          console.log('Image téléchargée avec succès', response);
          this.user.avatarUrl = response.secure_url; // Mise à jour de l'URL de l'avatar
        },
        error: (err) => {
          console.error('Erreur lors du téléchargement de l\'image:', err);
        }
      });
    }
  }

  onSaveProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    this.profileService.updateProfile(userId, this.user).subscribe({
      next: (data) => {
        console.log('Profil mis à jour avec succès', data);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du profil :", err);
      }
    });
  }

  // Méthode pour gérer le portfolio si l'utilisateur est prestataire
  gererPortfolio(): void {
    console.log("Redirection vers la gestion du portfolio...");
    this.router.navigate(['/portfolio']); // Assure-toi que cette route existe
  }
}
