import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as I from '../IGallery';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GalleryService {

  private baseUrl = 'http://localhost:8080/BeautyCodeSalon/';

  constructor(private http: Http) { }

  RequestPhotosIds(albumId: string): Observable<Array<I.ResponseAlbum>> {
    return this.http.get(this.baseUrl + 'album/' + albumId)
      .map((res: any) => {
        return <Array<I.ResponseAlbum>>JSON.parse(res._body);
      });
  }

  RequestPhotoUrl(photoId: string, photoType: string = 'album'): Observable<I.ResponsePhotoUrl> {
    return this.http.get(this.baseUrl + 'photoUrl/' + photoId + '/' + photoType)
      .map((res: any) => {
        return <I.ResponsePhotoUrl>JSON.parse(res._body);
      });
  }

}