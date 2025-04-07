import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/utilisateurs';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, mdp: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&mdp=${mdp}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        } else {
          throw new Error('Email ou mot de passe incorrect');
        }
      })
    );
  }
  
  register(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }
  getNotifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/notifications?userId=${userId}`);
  }

  getRole(): string {
    return this.getUser()?.role;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isClient(): boolean {
    return this.getRole() === 'client';
  }

  isPrestataire(): boolean {
    return this.getRole() === 'prestataire';
  }
}
