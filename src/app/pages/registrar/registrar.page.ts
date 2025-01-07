import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, MapType } from '@capacitor/google-maps';

import { apiKeyMaps } from 'src/app/const/constants';



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

  constructor(
    private navCtrl: NavController, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      console.log('Tipo: ', this.tipo);
      if (this.tipo == 'Entrada') {
        this.titulo = 'Registro de Entrada';
      }else if(this.tipo == 'Salida') {
        this.titulo = 'Registro de salida';
      }
    });

    this.obtenerFechaActual();
  }

  ionViewDidEnter() {
    this.transparency = true;
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
  
  async initMap() {
    const coordenadas = await Geolocation.getCurrentPosition();
    console.log('coordenadas: ',coordenadas);
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;

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
      apiKey: apiKeyMaps,  // Solo necesario para iOS
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
  }

}
