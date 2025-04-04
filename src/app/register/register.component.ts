import { Component } from '@angular/core';
import { AuthService } from 'src/Service/auth.service';  // Service d'authentification

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'client';  // Valeur par défaut
  errorMessage: string = '';
  succesMessage: string = '';


  constructor(private authService: AuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(userData).subscribe(
      response => {
        // Logique après une inscription réussie
        this.succesMessage = 'Registration succes';
        // Rediriger ou afficher un message de succès
      },
      error => {
        // Affichage du message d'erreur en cas d'échec
        this.errorMessage = 'Registration failed, please try again';
      }
    );
  }
}
