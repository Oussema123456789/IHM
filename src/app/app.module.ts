import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PostComponent } from './post/post.component';
import { ListprestataireComponent } from './listprestataire/listprestataire.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SousCategorieComponent } from './sous-categorie/sous-categorie.component';
import { AjouterSousCategorieComponent } from './ajouter-sous-categorie/ajouter-sous-categorie.component';
import { ModifierSousCategorieComponent } from './modifier-sous-categorie/modifier-sous-categorie.component';
import { AjouterPublicationComponent } from './ajouter-publication/ajouter-publication.component';
import { PostviewComponent } from './postview/postview.component';
import { ModifierPublicationComponent } from './modifier-publication/modifier-publication.component';
import { AdminValidationsComponent } from './admin-validations/admin-validations.component';
import { WelcomeclientComponent } from './welcomeclient/welcomeclient.component';
import { NavbarclientComponent } from './navbarclient/navbarclient.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AjouterUtilisateurComponent } from './utilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { BloquerPrestataireComponent } from './utilisateur/bloquer-prestataire/bloquer-prestataire.component';
import { SignalerPrestataireComponent } from './utilisateur/signaler-prestataire/signaler-prestataire.component';
import { ModifierUtilisateurComponent } from './utilisateur/modifier-utilisateur/modifier-utilisateur.component';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';
@NgModule({
  declarations: [
    AjouterPublicationComponent,
    AppComponent,
    LoginComponent,
    CategorieComponent,
    PostComponent,
    ListprestataireComponent,
    ProfileComponent,
  AddCategorieComponent,
  UpdateCategorieComponent,
  AdminComponent,
  ClientComponent,
  PrestataireComponent,
  UnauthorizedComponent,
  RegisterComponent,
  LeftbarComponent,
  NavbarComponent,
  PortfolioComponent,
  AjouterSousCategorieComponent,  ModifierSousCategorieComponent,SousCategorieComponent, PostviewComponent, ModifierPublicationComponent, AdminValidationsComponent, WelcomeclientComponent, NavbarclientComponent, UserpageComponent
  ,AjouterUtilisateurComponent, BloquerPrestataireComponent, SignalerPrestataireComponent, ModifierUtilisateurComponent, UtilisateurListComponent
  

  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
