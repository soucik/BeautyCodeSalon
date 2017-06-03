import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HomeComponent }   from './Home/home.component';
import { PricesComponent }   from './Prices/prices.component';
import { GalleryComponent } from './Gallery/gallery.component';
import { GalleryVideoComponent } from './GalleryVideo/galleryVideo.component';

import { SocialComponent } from './Shared/Social/social.component';

import { AppRoutingModule }  from './app-routing.module';

//other libs
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SharedModule } from './Shared/Shared/shared.module';

//services with dependencies
import { GalleryService } from './Gallery/Services/gallery.service';
import { HttpModule, Http } from '@angular/http';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "./app/i18n/", ".json");
}

@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  AgmCoreModule.forRoot({apiKey: 'AIzaSyBgTXzwwXAEZ65MlwJ-W1S7deIeBY81NbA'}),
                  Ng2PageScrollModule.forRoot(),
                  TranslateModule.forRoot({
                    loader: {
                      provide: TranslateLoader,
                      useFactory: HttpLoaderFactory,
                      deps: [Http]
                    }
                  }),
                  SharedModule,
                  HttpModule
                  ],
  // providers:    [ GalleryService
  //                 ],
  declarations: [ AppComponent,
                  HomeComponent,
                  PricesComponent,
                  GalleryComponent,
                  GalleryVideoComponent,
                  SocialComponent
                  ],
  bootstrap:    [ AppComponent
                  ]
})
export class AppModule { }
