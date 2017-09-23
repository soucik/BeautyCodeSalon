import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from './Services/gallery.service';
import * as I from './IGallery';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'gallery-salon',
  templateUrl: './app/Gallery/gallery.html',
  providers: [GalleryService]
})

export class GalleryComponent  {

  private albums: I.FbAlbum = {
    hairID: '10204426332601677',
    lashesID: '',
    wimpersID: '',
    extensionsID: '',
    nailsID: ''
  };

  private albumPictures: Array<I.OutFbAlbum>;
  private pictures: Array<I.OutFbPhoto>;

  constructor(
    private galleryService: GalleryService
  ) {
    this.albums.hairPicturesIDs = this.getAlbumPhotos(this.albums.hairID);
  }

  getAlbumPhotos(albumID: string): any {
    let oAlbumPhotos = this.galleryService.getAlbumPhotos(albumID)
    oAlbumPhotos.subscribe(response => { return response });
  }
}


