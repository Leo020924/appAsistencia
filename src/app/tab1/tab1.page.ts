import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_URL } from '../const/constants';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  userData: any;
  currentDate: string = '';
  fechaActual: string = '';
  horaEntrada: string = '-:-';
  horaSalida: string = '-:-';
  horaInicioComida: string = '-:-';
  horaFinComida: string = '-:-';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private http: HttpClient,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    console.log('hola-ngoninit');
    // const today = new Date();
    // const options: Intl.DateTimeFormatOptions = {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // };
    // this.currentDate = today.toLocaleDateString('es-ES', options);

    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const fecha = new Date();
    // Fecha actual
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = meses[fecha.getMonth()];
    
    this.fechaActual = `${diaSemana}, ${dia} ${mes}`;
    console.log('Entro al ngOnInit');
  }

  ionViewWillEnter() {
    console.log('Entro-----------------');
    this.presentLoading();
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
      });

      this.http.get<any>(`${API_URL}obtener_datos`, { headers }).subscribe(
        (data) => {
          console.log('Entro al api-------------------------------');
          console.log('Datos del usuario:', data); 
          this.userData = data; 
          const registros = data.attendances_today[0];
          console.log('Registros del dia: ', registros)
          console.log('Registros del dia: hora entrada: ', registros.hora_entrada)
          // this.horaEntrada = registros.hora_entrada ?? this.horaEntrada;
          // this.horaSalida = registros.hora_salida ?? this.horaSalida;
          // this.horaInicioComida = registros.hora_inicio_comida ?? this.horaInicioComida;
          // this.horaFinComida = registros.hora_fin_comida ?? this.horaFinComida;
          this.horaEntrada = registros.hora_entrada && registros.hora_entrada !== null ? this.convertirHora(registros.hora_entrada.substring(0,5)) : '-:-';
          this.horaSalida = registros.hora_salida && registros.hora_salida !== null ? this.convertirHora(registros.hora_salida.substring(0,5)) : '-:-';
          this.horaInicioComida = registros.hora_inicio_comida && registros.hora_inicio_comida !== null ? this.convertirHora(registros.hora_inicio_comida.substring(0,5)) : '-:-';
          this.horaFinComida = registros.hora_fin_comida && registros.hora_fin_comida !== null ? this.convertirHora(registros.hora_fin_comida.substring(0,5)) : '-:-';
          this.dismissLoading();
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error); 
          this.dismissLoading();
        }
      );
    } else {
      console.error('No se encontró el token de autenticación.');
      this.dismissLoading();
      this.navCtrl.navigateRoot('/login');
      return;
    }
  }

  convertirHora(hora24: string): string {
    // Extraemos la hora y los minutos
    let [hora, minutos] = hora24.split(':').map(num => parseInt(num));
  
    // Determinamos si es AM o PM
    const ampm = hora >= 12 ? 'PM' : 'AM';
  
    // Convertimos la hora a formato de 12 horas
    hora = hora % 12;
    hora = hora ? hora : 12;  // Si la hora es 0, la convertimos en 12
  
    // Formateamos la hora y los minutos
    return `${hora}:${minutos < 10 ? '0' + minutos : minutos} ${ampm}`;
  }

  logout() {
    this.authService.logout();
  }

  registrar(tipo: string) {
    if (tipo === 'Descanso') {
      tipo = this.horaInicioComida === '-:-' ? 'Inicio Descanso' : 'Fin Descanso';
    }
    this.navCtrl.navigateRoot(['/registrar'], {
      queryParams: { tipo: tipo }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
  }
  
  async dismissLoading() {
    await this.loadingController.dismiss();
  }

}
