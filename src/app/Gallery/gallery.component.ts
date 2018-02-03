import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from './Services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Images{
  path: string;
  name: string;
  size: number;
  extension: string;
}

@Component({
  selector: 'gallery-salon',
  templateUrl: './app/Gallery/gallery.html',
  providers: [GalleryService]
})

export class GalleryComponent {

  imgPath: string = 'img/gallery/';
  images: Array<Images>;
  subscribeUrlParam_photo: any;

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public callImageNames(): void {
    this.galleryService.getImageNames()
      .then((data) => {
        this.images = data.map((data: any) => data.name);
        this.GetParameters();
      });
  }

  ngOnInit() {
    this.callImageNames();
  }

  GetParameters() {
    this.subscribeUrlParam_photo = this.route.queryParams.subscribe(urlParams => {
      var photo = +urlParams['photo'];
      if(!isNaN(photo))
        this.showModal(photo);
    });
  }

  showModal(photo: number) {
    var me = this;
    var $lightbox = $('#lightbox');
    var $img = $lightbox.find('img');
    var $close = $lightbox.find('.close');
    var css = {
      'maxWidth': $(window).width(),
      'maxHeight': $(window).height() - 5
    };

    $img.attr('src', this.imgPath + this.images[photo-1]);
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


