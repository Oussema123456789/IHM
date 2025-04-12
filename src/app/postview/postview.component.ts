import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Publication } from 'src/Model/Publication';
import { SousCategorie } from 'src/Model/SousCategorie';
import { Utilisateur } from 'src/Model/Utilisateur';
import { Avis } from 'src/Model/Avis';
import { AvisService } from 'src/Service/avis.service';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  publications: Publication[] = [];
  prestataires: any[] = [];
  sousCategories: SousCategorie[] = [];
  utilisateurs: Utilisateur[] = [];
  avisList: Avis[] = [];  // Liste des avis

  isLoading = true;
  isPrestataire = false;
  isAdmin = false;
  isClient = false;
  currentUserId: string = '';

  // Recherche avancée
  filter = {
    prestataireId: '',
    sousCategorieId: '',
    prixMin: 0,
    prixMax: Number.MAX_SAFE_INTEGER
  };

  // Recherche simple
  searchTerm: string = '';

  // Avis
  selectedNote: { [key: string]: number } = {};
  commentaireAvis: { [key: string]: string } = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser) {
      this.currentUserId = currentUser.id;
      this.isPrestataire = currentUser.role === 'prestataire';
      this.isAdmin = currentUser.role === 'admin';
      this.isClient = currentUser.role === 'client';
    }

    this.http.get<Publication[]>('http://localhost:3000/publications').subscribe((data) => {
      if (this.isAdmin) {
        this.publications = data;
      } else if (this.isPrestataire) {
        // Afficher uniquement les publications du prestataire connecté
        this.publications = data.filter(pub => pub.prestataireId === this.currentUserId);
      } else {
        // Pour les clients : seulement les publications validées
        this.publications = data.filter(pub => pub.statut === 'active');
      }
      this.isLoading = false;
    });
    
    this.http.get<Utilisateur[]>('http://localhost:3000/utilisateurs').subscribe((data) => {
      this.utilisateurs = data;
      this.prestataires = data.filter(user => user.role === 'prestataire');
    }); 
    
    this.http.get<SousCategorie[]>('http://localhost:3000/souscategories').subscribe((data) => {
      this.sousCategories = data;
    });

    // Charger les avis
    this.avisService.getAvis().subscribe((data) => {
      this.avisList = data;
    });
  }

  // Utilitaire
  getPrestataireById(id: string): Utilisateur | undefined {
    return this.utilisateurs.find(u => u.id?.toString() === id);
  }

  getSousCategorieById(id: string): string {
    const sc = this.sousCategories.find(s => s.id === id);
    return sc ? sc.nomscat : 'Non défini';
  }

  isMyPublication(pub: Publication): boolean {
    return pub.prestataireId === this.currentUserId;
  }

  modifierPublication(id: string): void {
    this.router.navigate(['/modifier-publication', id]);
  }

  supprimerPublication(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) {
      this.http.delete(`http://localhost:3000/publications/${id}`).subscribe(() => {
        this.publications = this.publications.filter(pub => pub.id !== id);
      });
    }
  }

  // Validation pour admin
  validerPublication(id: string): void {
    this.http.patch(`http://localhost:3000/publications/${id}`, { statut: 'active' }).subscribe(() => {
      const updated = this.publications.find(pub => pub.id === id);
      if (updated) updated.statut = 'active';
    });
  }

  // Enregistrement d'un avis
  enregistrerAvis(publicationId: string): void {
    const note = this.selectedNote[publicationId];
    const commentaire = this.commentaireAvis[publicationId];

    const avis: Avis = {
      id_user: this.currentUserId,
      id_publication: publicationId,
      note: note,
      commentaire: commentaire
    };

    this.avisService.ajouterAvis(avis).subscribe(() => {
      alert("Avis enregistré !");
      this.selectedNote[publicationId] = 0;
      this.commentaireAvis[publicationId] = '';
    });
  }

  // Filtrage combiné : simple + avancé
  filteredPublications(): Publication[] {
    const rawTerm = this.searchTerm.trim().toLowerCase();
    const terms = rawTerm ? rawTerm.split(/\s+/) : [];

    return this.publications.filter(pub => {
      const prixValide = pub.prix >= this.filter.prixMin && pub.prix <= this.filter.prixMax;
      const sousCatValide = this.filter.sousCategorieId ? pub.sousCategorieId === this.filter.sousCategorieId : true;
      const prestValide = this.filter.prestataireId ? pub.prestataireId === this.filter.prestataireId : true;

      if (!prixValide || !sousCatValide || !prestValide) return false;

      if (terms.length === 0) return true;

      const prestataire = this.getPrestataireById(pub.prestataireId);
      const nomPrestataire = prestataire?.nom?.toLowerCase() || '';
      const sousCategorie = this.getSousCategorieById(pub.sousCategorieId)?.toLowerCase() || '';
      const description = pub.description?.toLowerCase() || '';
      const prix = pub.prix?.toString() || '';

      const fullContent = `${nomPrestataire} ${sousCategorie} ${description} ${prix}`;
      return terms.every(term => fullContent.includes(term));
    });
  }
  getUtilisateurById(id: string | number): Utilisateur | undefined {
  // Ensure the 'id' is converted to a string before comparing
  const idStr = id.toString();
  return this.utilisateurs.find(u => u.id?.toString() === idStr);
}

  // Récupérer les avis pour une publication
  getAvisByPublication(pubId: string): Avis[] {
    return this.avisList.filter(a => a.id_publication === pubId);
}

showPopup = false;
selectedPrestataireId: string | null = null;

ouvrirPopup() {
  this.selectedPrestataireId = this.currentUserId; // par exemple, si tu veux ouvrir le popup pour l'utilisateur connecté
  this.showPopup = true;
}

fermerPopup() {
  this.showPopup = false;
}
showContactModal = false;
contactEmail: string = '';
contactMessage: string = '';
contactPhoneNumber: string = '';
selectedPrestataireName: string = ''; // ou récupéré dynamiquement selon le prestataire

}
