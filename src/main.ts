import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import "jquery";
import "bootstrap";

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);