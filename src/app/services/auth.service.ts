import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authState = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  login(email: string, password: string) {
    const url = 'https://sistemais.municipiosmexico.com/api/auth/login';
    const body = { email, password };
    let user;
    
    return this.http
      .post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((response: any) => {
          console.log(response);
          if (response['message'] === 'Login successful') {
            localStorage.setItem('token', response['access_token']);
            let storedUser = localStorage.setItem('user', JSON.stringify(response['user']));
            console.log(storedUser); 
            this.isAuthenticated.next(true);
            this.navCtrl.navigateRoot('/tabs'); 
          } else {
            this.isAuthenticated.next(false);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.navCtrl.navigateRoot('/login');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
