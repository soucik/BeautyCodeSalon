import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class GalleryService {

private imagesPath='img/gallery/images.json';

constructor(private http: Http) { }

  getImageNames(): Promise<any> {
    return this.http.get(this.imagesPath)
               .toPromise()
               .then(response => response.json())
               .catch();
  }
}