import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/Service/profile.service';// Assurez-vous que le service est importé correctement
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    nom: '',
    email: '',
    avatarUrl: 'https://via.placeholder.com/100x100.png',
    address: '',
    phone: '',
    city: ''
  };

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id');  // Récupère l'ID de l'URL
    if (userId) {
      this.profileService.getProfile(userId).subscribe((data) => {
        console.log('Profil récupéré:', data);  // Affiche les données dans la console
        this.user = data;  // Met à jour le modèle utilisateur avec les données récupérées
      });
    } else {
      console.error('User ID is null');  // Gère le cas où l'ID est null
    }
  }

  onSaveProfile(): void {
    console.log('Profile sauvegardé:', this.user);  // Affiche les données à sauvegarder
    const userId = this.route.snapshot.paramMap.get('id');  // Récupère l'ID de l'URL
    if (userId) {
      this.profileService.updateProfile(userId, this.user).subscribe((response) => {
      console.log('Réponse de la mise à jour:', response);  // Affiche la réponse de l'API
      });
    } else {
      console.error('User ID is null');  // Gère le cas où l'ID est null
    }
  }

 
}