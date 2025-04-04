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
import { FormsModule } from '@angular/forms';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
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
  

  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
