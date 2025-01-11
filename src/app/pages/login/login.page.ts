import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ''; // uriel.terronesf@gmail.com
  password: string = ''; // 12345678
  estilo: string = "none";

  constructor(
    private navCtrl: NavController, 
    private http: HttpClient,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // this.obtenerUbicacion();
  }

  // async obtenerUbicacion() {
  //   try {
  //     // Solicitar permisos de ubicación
  //     const permissionStatus = await Geolocation.requestPermissions();

  //     if (permissionStatus.location === 'granted') {
  //       // Obtener la ubicación si los permisos son otorgados
  //       const position = await Geolocation.getCurrentPosition();
  //       const { latitude, longitude } = position.coords;

  //       // Mostrar la ubicación obtenida
  //       const toast = await this.toastController.create({
  //         message: `Ubicación: ${latitude}, ${longitude}`,
  //         duration: 2000,
  //       });
  //       toast.present();
  //     } else {
  //       await Geolocation.requestPermissions();
  //       // Si no se otorgan los permisos
  //       const toast = await this.toastController.create({
  //         message: 'Permiso de ubicación denegado',
  //         duration: 2000,
  //       });
  //       toast.present();
  //     }
  //   } catch (error) {
  //     // Manejo de errores
  //     const toast = await this.toastController.create({
  //       message: `Error al obtener la ubicación: ${error}`,
  //       duration: 2000,
  //     });
  //     toast.present();
  //   }
  // }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'El usuario o la contraseña son incorrectos',
      message: message,
      buttons: ['Volver a intentar'],
    });

    await alert.present();
  }


  async iniciar_sesion() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // El `tap` en el servicio ya maneja la navegación y almacenamiento del token
        if (response['message'] === 'Invalid credentials') {
          this.estilo = "block";
        } else {
          this.estilo = "none";
        }
      },
      error => {
        console.log('Error status:', error.status);
        this.showErrorAlert("Usuario o contraseña incorrectos");
        this.estilo = "block";
        if (error.error) {
          console.error('Error details:', error.error.message || 'No message');
        }
      }
    );
  }


}
