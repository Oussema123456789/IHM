import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map  } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPublications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publications`);
  }

  getCategorie(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categories`);
  }

  getPrestataires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/utilisateurs`).pipe(
      map(users => users.filter(u => u.role === 'prestataire'))
    );
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/utilisateurs`).pipe(
      map(users => users.filter(u => u.role === 'client'))
    );
  }
}
