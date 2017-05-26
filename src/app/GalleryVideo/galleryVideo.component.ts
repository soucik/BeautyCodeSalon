import { Component } from '@angular/core';

interface Images{
  path: string;
  name: string;
  size: number;
  extension: string;
}

@Component({
  selector: 'gallery-salon-video',
  templateUrl: './app/GalleryVideo/galleryVideo.html'
})

export class GalleryVideoComponent
{
  constructor() {
  }

}


