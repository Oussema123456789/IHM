import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudName = 'iset-sfax'; // Remplace par ton Cloud Name
  private uploadPreset = 'Ecommerce_cloudinary'; // Remplace par ton upload preset

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/iset-sfax/image/upload`;

    return this.http.post(url, formData);
  }
}
