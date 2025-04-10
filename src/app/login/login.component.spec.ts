import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      user => {
        // Après une connexion réussie, rediriger selon le rôle
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'client') {
          this.router.navigate(['/Post']);
        } else {
          this.router.navigate(['/Post']);
        }
      },
      error => {
        // Si l'utilisateur est bloqué, l'erreur contient le message "Votre compte est bloqué"
        this.errorMessage = error.message;
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }

  redirectlogin() {
    this.router.navigate(['/login']);
  }
}
