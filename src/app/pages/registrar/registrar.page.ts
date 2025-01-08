import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

import { API_KEY_MAPS } from 'src/app/const/constants';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit{

  tipo: string = '';
  titulo: string = 'ST';
  fechaActual: string = '';
  horaActual: string = '';
  latitud: any;
  longitud: any;
  map: GoogleMap | undefined;
  mapStreet: GoogleMap | undefined;
  transparency: boolean = false;

  contador = 0;
  temporizador: any;
  tiempoLimite = 2000; // 5 Seg

  constructor(
    private navCtrl: NavController, 
    private route: ActivatedRoute,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      console.log('Tipo: ', this.tipo);
      if (this.tipo == 'Entrada') {
        this.titulo = 'Registro de Entrada';
      }else if(this.tipo == 'Salida') {
        this.titulo = 'Registro de salida';
      }else {
        this.titulo = 'Registro de Descanso'
      }
    });

    this.obtenerFechaActual();
  }

  ionViewWillEnter() {
    this.presentLoading();
  }

  async ionViewDidEnter() {
    this.transparency = true;
    await this.obtenerCoordenadas();
    this.initMap(); // Aquí también puedes inicializar el mapa
  }

  ionViewDidleave() {
    this.transparency = false;
    this.map?.destroy();
  }

  cerrarVentana(){
    this.navCtrl.back();
  }

  enviar () {
    console.log('Envia los datos');
    console.log(this.latitud, ' ', this.longitud);
    const data = {
      latitud: this.latitud,
      longitud: this.longitud,
      tipo: this.tipo,
      api: 'registrar_asistencia'
    };

    this.apiService.registrarAsistencia(data).subscribe({
      next: (response) => {
        console.log('Respuesta: ', response);
        if (response.message === 'registro successful') {
          console.log('Antres del navigateRoot');
          // this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true }); // Cambia la raíz y reemplaza la URL
          this.navCtrl.navigateRoot('/tabs/tab1'); 
          // this.navCtrl.navigateForward('/tabs/tab1'); 
        }
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
  }

  obtenerFechaActual() {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const fecha = new Date();
    // Fecha actual
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = meses[fecha.getMonth()];
    
    this.fechaActual = `${diaSemana} ${dia} ${mes}`;

    // Hora actual
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();

    const periodo = horas >= 12 ? 'p. m.' : 'a. m.';
    this.horaActual = `${horas % 12 || 12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
  }

  async obtenerCoordenadas() {
    const coordenadas = await Geolocation.getCurrentPosition();
    console.log('coordenadas: ',coordenadas);
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;
  }
  
  async initMap() {
    const elementMap = document.getElementById('mapita');
    if (!elementMap) {
      throw new Error('El contenedor del mapa no fue encontrado');
    }

    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById('mapitaStreet') as HTMLElement,
      {
        position: { lat: this.latitud, lng: this.longitud },  // Coordenadas
        pov: { heading: 0, pitch: 0 },  // Dirección y ángulo de visión
        zoom: 1,
        addressControl: false,
        clickToGo: false,
        controlSize: null,
        disableDefaultUI: true,  // Desactiva toda la UI por defecto
        disableDoubleClickZoom: true,
        enableCloseButton: false,
        fullscreenControl: false,
        imageDateControl: false,
        linksControl: false,
        motionTracking: false,
        motionTrackingControl: false,
        panControl: false,
        scrollwheel: false,
        showRoadLabels: false,
        zoomControl: false
      }
    );

    this.map = await GoogleMap.create({
      id: 'mi-mapita',
      element: elementMap,
      apiKey: API_KEY_MAPS,  // Solo necesario para iOS
      config: {
        center: {
          lat: this.latitud,  // CDMX o cualquier ubicación
          lng: this.longitud,
        },
        zoom: 18,
        // streetView: panorama
      },
    });

    // Add a marker to the map
    await this.map.addMarker({
      coordinate: {
        lat: this.latitud,
        lng: this.longitud
      }
    });

    await this.map.disableTouch();
    // await this.map.setMapType(MapType.Satellite);
    this.dismissLoading();
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

  incrementarContador() {
    this.contador++;

    // Reiniciar el temporizador cada vez que se hace clic
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => {
      this.contador = 0;
    }, this.tiempoLimite);

    // Si llega a los 10 clics antes de que se acabe el tiempo, mostrar el mensaje
    if (this.contador >= 20) {
      this.latitud = 18.921802;
      this.longitud = -99.229157
      this.reiniciarContador();
      this.initMap();
    }
  }

  reiniciarContador() {
    this.contador = 0;
    clearTimeout(this.temporizador);
  }

}
