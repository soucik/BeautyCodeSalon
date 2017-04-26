import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'gallery',
  templateUrl: './app/Gallery/gallery.html'
})
export class GalleryComponent {

  imgPath: string = './img/gallery/';
  images4x3Src: Array<string> = [];
  images3x4Src: Array<string> = [];

  constructor() {
    this.set4x3Images();
    this.set3x4Images();
  }
  
  public set4x3Images() {
    for (var i = 1; i <= 4; i++) {
      this.images4x3Src.push(this.imgPath + i.toString() + '.jpg');
    }
  }

  public set3x4Images() {
    for (var i = 5; i <= 7; i++) {
      this.images3x4Src.push(this.imgPath + i.toString() + '.jpg');
    }
  }

}
