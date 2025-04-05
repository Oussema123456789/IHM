import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from 'src/Model/Publication';
import { SousCategorie } from 'src/Model/SousCategorie';
import { Utilisateur } from 'src/Model/Utilisateur';
import { Router } from '@angular/router';

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
  isPrestataire: boolean = false;
  currentUserId: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser) {
      this.currentUserId = currentUser.id;
      if (currentUser.role === 'prestataire') {
        this.isPrestataire = true;
      }
    }

    // Charger les publications
    this.http.get<Publication[]>('http://localhost:3000/publications')
      .subscribe((data) => {
        this.publications = data;
        this.isLoading = false;
      });

    // Charger les utilisateurs (prestataires)
    this.http.get<Utilisateur[]>('http://localhost:3000/utilisateurs')
      .subscribe((utilisateursData) => {
        this.utilisateurs = utilisateursData.filter(user => user.role === 'prestataire');
      });

    // Charger les sous-catégories
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

  // Vérifie si la publication appartient à l'utilisateur connecté
  isMyPublication(pub: Publication): boolean {
    return pub.prestataireId === this.currentUserId;
  }
  modifierPublication(id: string): void {
    this.router.navigate(['/modifier-publication', id]);
  }
  // Supprimer une publication
  supprimerPublication(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) {
      this.http.delete(`http://localhost:3000/publications/${id}`).subscribe(() => {
        this.publications = this.publications.filter(pub => pub.id !== id);
      });
    }
  }
}
