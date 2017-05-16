import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import "jquery";
import "bootstrap";
import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);