import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PostComponent } from './post/post.component';
import { ListprestataireComponent } from './listprestataire/listprestataire.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { AuthGuard } from './gurads/auth.guard';
import { AdminGuard } from './gurads/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ClientGuard } from './gurads/client.guard';
import { PrestataireGuard } from './gurads/prestataire.guard';
import { RegisterComponent } from './register/register.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SousCategorieComponent } from './sous-categorie/sous-categorie.component';
import { AjouterSousCategorieComponent } from './ajouter-sous-categorie/ajouter-sous-categorie.component';
import { ModifierSousCategorieComponent } from './modifier-sous-categorie/modifier-sous-categorie.component';
import { AjouterPublicationComponent } from './ajouter-publication/ajouter-publication.component';
import { PostviewComponent } from './postview/postview.component';
import { ModifierPublicationComponent } from './modifier-publication/modifier-publication.component';
import { AdminValidationsComponent } from './admin-validations/admin-validations.component';
import { WelcomeclientComponent } from './welcomeclient/welcomeclient.component';
import { UserpageComponent } from './userpage/userpage.component';
import { BloquerPrestataireComponent } from './utilisateur/bloquer-prestataire/bloquer-prestataire.component';
import { SignalerPrestataireComponent } from './utilisateur/signaler-prestataire/signaler-prestataire.component';
import { ModifierUtilisateurComponent } from './utilisateur/modifier-utilisateur/modifier-utilisateur.component';
import { AjouterUtilisateurComponent } from '././utilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  
  // Routes protégées par AuthGuard et AdminGuard pour l'admin
  { 
    path: 'Categorie', 
    component: CategorieComponent, 
    canActivate: [AuthGuard, AdminGuard] 

  },
  { 
    path: 'Post', 
    component: PostComponent, 
    canActivate: [AuthGuard] 

  },
  { 
    path: 'userpage/:id', 
    component: UserpageComponent, 
    canActivate: [AuthGuard] 

  },
  { 
    path: 'Listprestataire', 
    component: ListprestataireComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'ajouter-publication',  // :id permet de capturer l'ID du prestataire
    component: AjouterPublicationComponent,
    
    canActivate: [AuthGuard,PrestataireGuard] 
  },
  { path: 'profile/:id', component: ProfileComponent ,
    canActivate: [AuthGuard] 

  },
  
  { 
    path: 'addCategorie', 
    component: AddCategorieComponent, 
    canActivate: [AuthGuard,AdminGuard] 

  },
  { path: 'categories/:id/sous-categories', component: SousCategorieComponent,
    canActivate: [AuthGuard,AdminGuard] },
  { path: 'ajouter-sous-categorie/:id', component: AjouterSousCategorieComponent ,
    canActivate: [AuthGuard,AdminGuard]  },
  { path: 'modifier-sous-categorie/:id', component: ModifierSousCategorieComponent ,
    canActivate: [AuthGuard,AdminGuard] }
  ,
  { 
    path: 'updateCategorie/:id', 
    component: UpdateCategorieComponent, 
    canActivate: [AuthGuard, AdminGuard] 

    
  },
  { 
    path: 'portfolio', 
    component: PortfolioComponent, 
    canActivate: [AuthGuard, PrestataireGuard] 
  },
  { 
    path: 'Postview', 
    component: PostviewComponent
    ,
    canActivate: [AuthGuard,PrestataireGuard]  
  }, { 
    path: 'modifier-publication/:id', 
    component: ModifierPublicationComponent, 
    
    canActivate: [AuthGuard,PrestataireGuard] 
  },
   { 
    path: 'admin-validations', 
    component: AdminValidationsComponent, 
    canActivate: [AuthGuard,AdminGuard] 

  },
  
   { 
    path: 'admin-validations/:id', 
    component: AdminValidationsComponent, 
    canActivate: [AuthGuard,AdminGuard] 

  },
  { 
    path: 'welcomeclient', 
    component: WelcomeclientComponent, 
  },
  { path: 'utilisateur_list', component: UtilisateurListComponent ,    canActivate: [AuthGuard,AdminGuard] 
  },


  {
    path: 'utilisateur/ajouter',
    component: AjouterUtilisateurComponent,
    canActivate: [AuthGuard,AdminGuard] 

  },
  {
    path: 'utilisateur/modifier/:id',
    component: ModifierUtilisateurComponent,
    canActivate: [AuthGuard,AdminGuard] 
  },
  {
    path: 'prestataire/signaler/:id',
    component: SignalerPrestataireComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'prestataire/bloquer/:id',
    component: BloquerPrestataireComponent,
    canActivate: [AuthGuard,AdminGuard] 
  },





  


  // Routes spécifiques aux rôles
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'prestataire', component: PrestataireComponent, canActivate: [AuthGuard, PrestataireGuard] },
  
  // Page d'erreur si l'utilisateur tente d'accéder à une page non autorisée
  { path: 'unauthorized', component: UnauthorizedComponent },
  
  // Redirige les utilisateurs vers la page de login par défaut
  { path: '**', redirectTo: 'welcomeclient' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
