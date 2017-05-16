import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Home/home.component';
import { PricesComponent } from './Prices/prices.component';
import { GalleryComponent } from './Gallery/gallery.component';

import { GalleryService } from './Gallery/Services/gallery.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:photo', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
