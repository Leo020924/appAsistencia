import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  userData: any;
  currentDate: string = '';

  constructor(private router: Router, private authService: AuthService,private http: HttpClient) {}

  ngOnInit() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.currentDate = today.toLocaleDateString('es-ES', options);

  }

  ionViewWillEnter() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
      });

      this.http.get<any>('https://sistemais.municipiosmexico.com/api/obtener_datos', { headers }).subscribe(
        (data) => {
          console.log('Datos del usuario:', data); 
          this.userData = data; 
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error); 
        }
      );
    } else {
      console.error('No se encontró el token de autenticación.');
    }
  }

  logout() {
    this.authService.logout();
  }

  registrar(tipo: string) {
    this.router.navigate(['/registrar'], {
      queryParams: { tipo: tipo }
    });
  }

}
