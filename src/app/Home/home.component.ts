import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-home',
  styles: [`
    .sebm-google-map-container {
       height: 400px;
     }
  `],
  templateUrl: 'app/Home/home.html'
})
export class HomeComponent {

  // google maps zoom level
  zoom: number = 18;

  // initial center position for the map
  lat: number = 51.478879;
  lng: number = 5.658821;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.GetUrlParameters();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  markers: marker[] = [
    {
      lat: 51.478879,
      lng: 5.658821,
      label: 'Salon',
      draggable: false
    }
  ];

  GetUrlParameters() {
    if (this.route.snapshot.data.scrollTo === "contact") { //url contains /contact
      //TODO: not implemented scrolling to contact target
    }
  }
}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}