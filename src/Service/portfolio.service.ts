import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:3000/utilisateurs'; // JSON Server URL

  constructor(private http: HttpClient) {}

  // Récupérer les infos d'un utilisateur spécifique
  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Mettre à jour uniquement le portfolio d'un utilisateur
  savePortfolio(userId: string, portfolioData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { portfolio: portfolioData });
  }
}
