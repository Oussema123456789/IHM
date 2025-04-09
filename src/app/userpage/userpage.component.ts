import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/Model/Publication';
import { UtilisateurService } from 'src/Service/utilisateur.service';
import { PublicationService } from 'src/Service/publication.service'; // <-- ajoute ça
import { Utilisateur } from 'src/Model/Utilisateur';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  userId: string | null = null;
  user: any = null;
  publications: Publication[] = [];
  utilisateurs: Utilisateur[] = [];


  constructor(
    private route: ActivatedRoute,
    private userService: UtilisateurService,
    private publicationService: PublicationService // <-- injecte ici
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');  // Récupérer l'ID depuis l'URL
      if (this.userId) {
        this.loadPublications();
        this.loadUser();
      }
    });
  }

  loadPublications(): void {
    this.publicationService.getPublications().subscribe(data => {
      // filtrer les publications selon l'id de l'utilisateur
      this.publications = data.filter(pub => pub.prestataireId === this.userId);
    });
  }

  loadUser(): void {
    this.userService.getUserById(this.userId!).subscribe(data => {
      this.user = data;
    });
  }
  filteredPublications(): Publication[] {
    return this.publications.filter(p => p.statut === 'accepted'); // exemple
  }
  getPrestataireById(id: string): Utilisateur | undefined {
    return this.utilisateurs.find(user => user.id === Number(id));
  }
}
