import { Component, OnInit } from '@angular/core';

import {  AgmCoreModule} from 'angular2-google-maps/core';

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
  
    clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }  
  markers: marker[] = [
	  {
		  lat: 51.478879,
		  lng: 5.658821,
		  label: '',
		  draggable: false
	  }
  ]
}


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}