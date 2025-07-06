import { Component, ElementRef, Input, ViewChild } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  standalone: true
})
export class GoogleMapComponentComponent {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @Input() locations: { lat: string, lng: string }[] = [];
  // map: google.maps.Map;
  map: any
  constructor() { }

  async ngOnInit() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary(
      "marker",
    );
    const lat = this.locations[0].lat.replace('° N', '')
    const lng = this.locations[0].lng.replace('° E', '')
    const mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      mapId: "mapContainer",
    };

    const map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);

    const markerViewWithText = new AdvancedMarkerElement({
      map,
      position: { lat: Number(lat), lng: Number(lng) },
      title: "Title text for the marker at lat: 37.419, lng: -122.03",
    });

    // const marker = new google.maps.Marker({
    //   position: { lat: lat, lng: lng },
    //   map: map,
    //   title: 'Marker',
    //   zIndex: -1,
    // });

  }
}
