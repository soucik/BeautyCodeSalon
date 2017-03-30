import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HomeComponent }   from './Home/home.component';
import { PricesComponent }   from './Prices/prices.component';

import { AppRoutingModule }  from './app-routing.module';

//other libs
import {  AgmCoreModule} from 'angular2-google-maps/core';

@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  AgmCoreModule.forRoot()
                  ],
  declarations: [ AppComponent,
                  HomeComponent,
                  PricesComponent
                  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
