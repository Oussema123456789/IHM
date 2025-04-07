import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Avis } from 'src/Model/Avis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'})
export class AvisService {
  private apiUrl = 'http://localhost:3000/avis'; // Modifie si tu utilises un autre port

  constructor(private http: HttpClient) {}

  // Ajouter un nouvel avis
  ajouterAvis(avis: Avis): Observable<Avis> {
    return this.http.post<Avis>(this.apiUrl, avis);
  }

  // Récupérer tous les avis
  getAvis(): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.apiUrl);
  }

  // Récupérer les avis d'une publication
  getAvisParPublication(id_publication: string): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}?id_publication=${id_publication}`);
  }

  // Récupérer l'avis donné par un user sur une publication
  getAvisParUserEtPublication(id_user: string, id_publication: string): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}?id_user=${id_user}&id_publication=${id_publication}`);
  }

  // Modifier un avis existant
  modifierAvis(id: string, avis: Avis): Observable<Avis> {
    return this.http.put<Avis>(`${this.apiUrl}/${id}`, avis);
  }

  // Supprimer un avis
  supprimerAvis(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
