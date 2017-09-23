import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from './Services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as I from './IGallery';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'gallery-salon',
  templateUrl: './app/Gallery/gallery.html',
  providers: [GalleryService]
})

export class GalleryComponent implements OnInit {

  subscribeUrlParam_photo: any;

  public hairAlbum: I.FbAlbum = {
    albumID: '10204426332601677'
  };

  constructor(
    private galleryService: GalleryService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router) {

    this.initiallyGetAlbumPhotos();
  }

  initiallyGetAlbumPhotos(): Promise<any> {
    return this.getAlbumPhotos(this.hairAlbum, 'album')
      .then(albumWithPhotoIds => {
        this.hairAlbum = this.getPhotosUrls(albumWithPhotoIds, 'album');
      });
  }

  ngOnInit() {
    this.GetUrlParameters();
  }

  getAlbumPhotos(albumWithId: I.FbAlbum, photoType?: string): Promise<I.FbAlbum> {

    return new Promise<I.FbAlbum>((resolve, reject) => {
      let oAlbumPhotos = this.galleryService.RequestPhotosIds(albumWithId.albumID);

      oAlbumPhotos.subscribe((response: I.ResponseAlbum[]) => {
        albumWithId.photos = response;
        albumWithId.photos.forEach((photo: I.Photos) => { photo.photoElements = new Array() });
        resolve(albumWithId);
      });
    });
  }

  getPhotosUrls(albumWithPhotoIds: I.FbAlbum, photoType?: string): I.FbAlbum {
    albumWithPhotoIds.photos.forEach((photoRecord: I.Photos) => {
      this.getOnePhotoUrl(photoRecord.id)
        .subscribe((data: I.ResponsePhotoUrl) => this.assignRecordToAlbum(data));
    })
    return albumWithPhotoIds;
  }

  getOnePhotoUrl(photoId: string, photoType?: string): Observable<any> {
    return this.galleryService.RequestPhotoUrl(photoId, photoType);
  }

  GetUrlParameters() {
    this.subscribeUrlParam_photo = this.route.queryParams.subscribe((urlParams: Array<any>) => {
      var photoIdToShow: string = urlParams['photo'];
      if (/^\d+$/.test(photoIdToShow)) {
        this.testBeforeModal(photoIdToShow);
      }
    });
  }

  testBeforeModal(photoIdToShow: string): void {

    if (this.hairAlbum.photos) {
      var foundRecord = this.hairAlbum.photos
        .filter((record: I.Photos) => record.id == photoIdToShow);
    }

    if (!foundRecord) //No record exists
    {
      this.getOnePhotoUrl(photoIdToShow, 'normal')
        .subscribe((record: I.ResponsePhotoUrl) => {
          this.showModal(record.url);
          this.initiallyGetAlbumPhotos()
            .then(resolve => this.assignRecordToAlbum(record));
        });
    }

    if (foundRecord && foundRecord[0].id && foundRecord[0].photoElements[0] && !(foundRecord[0].photoElements[1])) // if Record Exists & Album-PhotoType Exists
      this.getOnePhotoUrl(foundRecord[0].id, 'normal')
        .subscribe((record: I.ResponsePhotoUrl) => {
          this.assignRecordToAlbum(record);
          this.showModal(foundRecord[0].photoElements[1]);
        });

    if (foundRecord && foundRecord[0].photoElements[1]) // if Record Exists & Normal-PhotoType Exists
      this.showModal(foundRecord[0].photoElements[1]);
  }

  assignRecordToAlbum(record: any) {

    var foundPhotoIndex = this.hairAlbum.photos
      .findIndex((recordToAssign: I.Photos) => recordToAssign.id == record.id);
    var photoEl = this.hairAlbum.photos[foundPhotoIndex];
    if (record.photoType == 'album')
      photoEl.photoElements[0] = record.url;
    else
      photoEl.photoElements[1] = record.url;
  }

  showModal(url: string) {
    var me = this;
    var $lightbox = $('#lightbox');
    var $img = $lightbox.find('img');
    var $close = $lightbox.find('.close');
    var css = {
      'maxWidth': $(window).width(),
      'maxHeight': $(window).height() - 5
    };

    $img.attr('src', url);
    $close.toggle();
    $img.css(css).toggle();
    $('#lightbox').modal('show');

    $lightbox.on('shown.bs.modal', function (e) {
      $lightbox.find('.modal-dialog').css({ 'width': $img.width() });
      $img.fadeIn();
      $close.removeClass('hidden').fadeIn();
    });

    $lightbox.on('hidden.bs.modal', function (e) {
      me.router.navigate(['/gallery']);
    });
  }

  ngOnDestroy() {
    this.subscribeUrlParam_photo.unsubscribe();
  }
}


