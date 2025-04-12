import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Service/auth.service';
import { CloudinaryService } from 'src/Service/cloudinary.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  role: string = 'client';
  avatarUrl: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (response) => {
          this.avatarUrl = response.secure_url;
        },
        error: () => {
          this.errorMessage = 'Erreur lors du téléchargement de l’image';
        }
      });
    }
  }

  register(): void {
    if (!this.email || !this.password || !this.confirmPassword || !this.role || !this.nom) {
      this.errorMessage = 'Please fill in all required fields';
      this.successMessage = '';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.successMessage = '';
      return;
    }
  
    const userData = {
      email: this.email,
      mdp: this.password,  // correspond à "mdp" dans le modèle
      role: this.role,
      nom: this.nom,
      avatarUrl: this.avatarUrl
      // on ne met pas phone, address, city car ils ne sont pas dans le modèle
    };
  
    this.authService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Registration failed, please try again';
        this.successMessage = '111111';
      }
    });
  }
  

  redirectlogin() {
    this.router.navigate(['/login']);
  }
}
