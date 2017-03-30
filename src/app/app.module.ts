import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HomeComponent }   from './Home/home.component';
import { PricesComponent }   from './Prices/prices.component';
import { GaleryComponent }   from './Galery/galery.component';

import { AppRoutingModule }  from './app-routing.module';

//other libs
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  AgmCoreModule.forRoot(),
                  Ng2PageScrollModule.forRoot()
                  ],
  declarations: [ AppComponent,
                  HomeComponent,
                  PricesComponent,
                  GaleryComponent
                  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
