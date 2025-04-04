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
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'Listprestataire', 
    component: ListprestataireComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard, PrestataireGuard] 
  },
  { path: 'profile/:id', component: ProfileComponent },
  { 
    path: 'addCategorie', 
    component: AddCategorieComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
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


  // Routes spécifiques aux rôles
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'prestataire', component: PrestataireComponent, canActivate: [AuthGuard, PrestataireGuard] },
  
  // Page d'erreur si l'utilisateur tente d'accéder à une page non autorisée
  { path: 'unauthorized', component: UnauthorizedComponent },
  
  // Redirige les utilisateurs vers la page de login par défaut
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
