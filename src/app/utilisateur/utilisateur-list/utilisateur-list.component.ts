import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/Model/Utilisateur';
import { UtilisateurService } from 'src/Service/utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.css']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.utilisateurService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
    });
  }
 

  supprimerUtilisateur(id: number | undefined) {
    if (id && confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurService.supprimerUtilisateur(id).subscribe(() => {
        this.chargerUtilisateurs();
      });
    }
  }
}