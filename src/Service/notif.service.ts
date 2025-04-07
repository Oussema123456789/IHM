import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
    private apiUrl = 'http://localhost:3000/notifications';  // Assurez-vous que votre serveur JSON Server est configuré

    constructor(private http: HttpClient) {}
  
    // Récupérer les notifications pour un utilisateur spécifique
    getNotifications(userId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
    }
  
    // Ajouter une notification
    addNotification(notification: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, notification);
    }
    createNotification(notification: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/notifications`, notification);
      }
  }