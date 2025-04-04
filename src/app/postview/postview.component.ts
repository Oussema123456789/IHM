import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from 'src/Model/Publication';
import { SousCategorie } from 'src/Model/SousCategorie';
import { Utilisateur } from 'src/Model/Utilisateur';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  publications: Publication[] = [];
  utilisateurs: Utilisateur[] = [];
  sousCategories: SousCategorie[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Charger les publications depuis le serveur JSON
    this.http.get<Publication[]>('http://localhost:3000/publications')
      .subscribe((data) => {
        this.publications = data;
        this.isLoading = false;
      });

    // Charger les utilisateurs (prestataires) depuis le serveur JSON
    this.http.get<Utilisateur[]>('http://localhost:3000/utilisateurs')
      .subscribe((utilisateursData) => {
        this.utilisateurs = utilisateursData.filter(user => user.role === 'prestataire');
      });

    // Charger les sous-catégories depuis le serveur JSON
    this.http.get<SousCategorie[]>('http://localhost:3000/souscategories')
      .subscribe((data) => {
        this.sousCategories = data;
      });
  }

  // Récupère l'utilisateur (prestataire) par son ID
  getPrestataireById(id: string): Utilisateur | undefined {
    const prestataire = this.utilisateurs.find(u => u.id?.toString() === id);
    if (!prestataire) {
      console.log(`Prestataire avec ID ${id} non trouvé.`);
    }
    return prestataire;
  }

  // Récupère le nom de la sous-catégorie par son ID
  getSousCategorieById(id: string): string {
    const sousCategorie = this.sousCategories.find(s => s.id === id);
    if (!sousCategorie) {
      console.log(`Sous-catégorie avec ID ${id} non trouvée.`);
      return 'Non défini';
    }
    return sousCategorie.nomscat;
  }
}
