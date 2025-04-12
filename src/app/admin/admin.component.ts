import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/Model/Categorie';
import { Publication } from 'src/Model/Publication';
import { Utilisateur } from 'src/Model/Utilisateur';
import { CategorieService } from 'src/Service/categorie.service';
import { PublicationService } from 'src/Service/publication.service';
import { StatService } from 'src/Service/stats.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {
    categories: Categorie[] = [];
    publications: Publication[] = [];
    currentUser: Utilisateur | null = null; // propriété utilisateur connecté

  constructor(private statsService: StatService,private categorieService:CategorieService,private publicationservice:PublicationService) {}
  prestatairesCount = 0;
clientsCount = 0;

ngOnInit(): void {
  this.loadCurrentUser();
console.log(this.currentUser);
  this.statsService.getPrestataires().subscribe(data => this.prestatairesCount = data.length);
  this.statsService.getClients().subscribe(data => this.clientsCount = data.length);
  this.getCategories();
  this.getPosts();

}
loadCurrentUser(): void {
  const userString = localStorage.getItem('user');
  if (userString) {
    this.currentUser = JSON.parse(userString);
  }
}
async getCategories(): Promise<void> {
 

  try {
    this.categories = (await this.categorieService.getCategories().toPromise()) || [];
  } catch (error) {
    console.error(error);
  } 
}
async getPosts(): Promise<void> {
 

  try {
    this.publications = (await this.publicationservice.getPublications().toPromise()) || [];
  } catch (error) {
    console.error(error);
  } 
}}
