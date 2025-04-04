import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryUploadService {
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/iset-sfax/image/upload';
  private uploadPreset = 'Ecommerce_cloudinary'; // Remplacez par votre preset

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    return this.http.post<any>(corsProxy + this.cloudinaryUrl, formData);
  }
}
