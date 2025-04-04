import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousCategorie } from '../Model/SousCategorie';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {
  private apiUrl = 'http://localhost:3000/souscategories';

  constructor(private http: HttpClient) {}

  getSousCategories(): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(this.apiUrl);
  }

  getSousCategorieById(id: string): Observable<SousCategorie> {
    return this.http.get<SousCategorie>(`${this.apiUrl}/${id}`);
  }

  getSousCategoriesByCategorieId(categorieId: string): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.apiUrl}?categorieId=${categorieId}`);
  }
  
  

  ajouterSousCategorie(sousCategorie: SousCategorie): Observable<SousCategorie> {
    return this.http.post<SousCategorie>(this.apiUrl, sousCategorie);
  }
  

  modifierSousCategorie(sousCategorie: SousCategorie): Observable<SousCategorie> {
    return this.http.put<SousCategorie>(`${this.apiUrl}/${sousCategorie.id}`, sousCategorie);
  }
  supprimerSousCategorie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}