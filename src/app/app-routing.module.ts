import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PostComponent } from './post/post.component';
import { ListprestataireComponent } from './listprestataire/listprestataire.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'Categorie', component: CategorieComponent },
  { path: 'Post', component: PostComponent },
  { path: 'Listprestataire', component: ListprestataireComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'addCategorie', component: AddCategorieComponent },
    { path: 'updateCategorie/:id', component: UpdateCategorieComponent },  { path: 'Categorie', redirectTo: '/Categorie', pathMatch: 'full' },
//ggggggg



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
