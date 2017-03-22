import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HomeComponent }   from './Home/home.component';
import { GaleryComponent }   from './Galery/galery.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule
                  ],
  declarations: [ AppComponent,
                  HomeComponent,
                  GaleryComponent
                  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
