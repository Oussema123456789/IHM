import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer l'utilisateur depuis le stockage local
    const user = localStorage.getItem('user');

    // Vérifier si un utilisateur est connecté
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.token; // Supposons que l'utilisateur stocke un token

      // Cloner la requête et ajouter l'en-tête d'autorisation
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
