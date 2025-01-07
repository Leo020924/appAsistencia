import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { API_URL } from '../const/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  registrarAsistencia(data: any): Observable<any> {
    const token = this.authService.getToken();

    const params = {
      'latitud': `${data.latitud}`,
      'longitud': `${data.longitud}`,
      'tipo': data.tipo
    }
    const url = API_URL + data.api;
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, params, { headers });
  }

}
