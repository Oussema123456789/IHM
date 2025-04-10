import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/Service/utilisateur.service';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent {
  utilisateurForm: FormGroup;
  roles: string[] = ['admin', 'prestataire', 'client'];

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {
    this.utilisateurForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      nom: ['', Validators.required],
      role: ['', Validators.required],
      avatarUrl: ['']
    });
  }

  ajouterUtilisateur() {
    if (this.utilisateurForm.valid) {
      const utilisateur = {
        ...this.utilisateurForm.value,
        bloque: false,
        signale: false
      };
      this.utilisateurService.ajouterUtilisateur(utilisateur).subscribe(() => {
        this.router.navigate(['/utilisateur/liste']);
      });
    }
  }
}