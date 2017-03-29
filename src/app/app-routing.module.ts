import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './Home/home.component';
import { PricesComponent }   from './Prices/prices.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'homeB#contact',  component: HomeComponent },
  { path: 'prices', component: PricesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
