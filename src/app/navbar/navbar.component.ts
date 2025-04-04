import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User in navbar:', this.user);
    console.log('Avatar URL:', this.user?.avatarUrl);
    console.log('Role:', this.user?.role); 
    console.log('id:', this.user?.id); 
  }

  logout(): void {
    this.authService.logout();
  }
}
