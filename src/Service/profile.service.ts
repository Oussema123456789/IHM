import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/utilisateurs';  // URL de ton backend (ajuste selon ton API)

  constructor(private http: HttpClient) {}

  // Récupérer le profil de l'utilisateur par son ID
  getProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);  // On suppose que l'ID de l'utilisateur est unique
  }

  // Mettre à jour les informations de l'utilisateur
  updateProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, profileData);
  }

  // Mettre à jour l'avatar de l'utilisateur
  updateAvatar(userId: string, avatarData: any): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', avatarData);
    return this.http.put<any>(`${this.apiUrl}/${userId}/avatar`, formData);
  }
}
