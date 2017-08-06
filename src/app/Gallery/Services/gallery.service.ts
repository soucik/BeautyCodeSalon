import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as I from '../IGallery';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GalleryService {

  private baseUrl: string = 'https://graph.facebook.com/v2.10/';
  private accessToken: string = 'EAACEdEose0cBAPsFYF9ZBwEZBFfSZBFu4M8PJdTQdtBSc9neVQIw1ZA4ZBlpxcEYxMPSrnZBIYjrsvtHGZAzOK0KRg5ZCRjsmyMI8ZCMbMdu4bxnX9kifzNH3l5FAUaM3mpRtdDqhNFDaDDBx1T49ojZCprwv6oTdMtw0V6RibI5sZAv5wUwFciMIwGZBBoGwKuIoqkZD';

  constructor(private http: Http) { }

  getAlbumPhotos(albumId: string): Observable<Array<I.OutFbAlbum>> {
    let albumPhotosIds = this.baseUrl + albumId + '/photos?' + 'access_token=' + this.accessToken;
    return this.http.get(albumPhotosIds)
      .map((res) => res.json().data as Observable<Array<I.OutFbAlbum>>)
      .catch((error: any) => Observable.throw(error.json().error || 'Fb Server error for gallery: ' + albumId + 'URL: ' + albumPhotosIds));
  }

  getPhotosUrls(photoId: string, photoType: string = 'normal'): Observable<Array<I.OutFbPhoto>> {
    let photosUrls = this.baseUrl + photoId + '/picture?' + 'type=' + photoType + '&access_token=' + this.accessToken;
    return this.http.get(photosUrls)
      .map((res) => res.json().data as Observable<Array<I.OutFbPhoto>>)
      .catch((error: any) => Observable.throw(error.json().error || 'Fb Server error for photo: ' + photoId + 'URL: ' + photosUrls));
  }
}
