import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

export interface RequestedAlbum {
  _body: ResponseAlbum;
}

export interface ResponseAlbum {
  created_time: string;
  id: string;
}

export interface ResponsePhotoUrl {
  id: string;
  photoType: string;
  url: string;
}

export interface FbAlbum {
  albumID: string;
  photos?: Array<Photos>;
}

export interface Photos {
  id: string;
  created_time?: string;
  photoElements?: string[];
}