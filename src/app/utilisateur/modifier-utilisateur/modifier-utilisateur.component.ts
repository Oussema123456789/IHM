import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/Model/Utilisateur';
import { UtilisateurService } from 'src/Service/utilisateur.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.css']
})
export class ModifierUtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup;
  id!: number;
  roles: string[] = ['admin', 'prestataire', 'client'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.utilisateurService.getUtilisateurById(this.id).subscribe((data: Utilisateur) => {
      this.utilisateurForm.patchValue(data);
    });
  }

  modifierUtilisateur() {
    if (this.utilisateurForm.valid) {
      const updatedUser = { ...this.utilisateurForm.value, id: this.id };
      this.utilisateurService.modifierUtilisateur(updatedUser).subscribe(() => {
        this.router.navigate(['utilisateur_list']);
      });
    }
  }
}