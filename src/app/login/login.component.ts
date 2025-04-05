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
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'client') {
          this.router.navigate(['/Postview']);
        } else {
          this.router.navigate(['/Postview']);
        }
      },
      error => {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    );
  }
}