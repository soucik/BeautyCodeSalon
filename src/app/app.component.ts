import { Component } from '@angular/core';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { PricesComponent } from './Prices/prices.component';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.html'
})
export class AppComponent {
  name = 'Beauty Code Salon';


  constructor(
    private translate: TranslateService) {
    this.translate.addLangs(["en", "nl"]);
    this.translate.setDefaultLang('en');

    this.translate.use(this.resolveLanguage());

    this.translate.onLangChange.subscribe(()=> {
      localStorage.setItem('choosenLang',this.translate.currentLang);
    });

    
    $(document).ready(function () { 
      $("body").removeClass('backgrounded');

      var scroll_pos = 0;
      $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 30) {
          $(".navbar-fixed-top").addClass("navbarScrolled");
        } else {
          $(".navbar-fixed-top").removeClass("navbarScrolled");
        }
      });
    });
  }

  resolveLanguage(): string{
    var choosenLangStor = localStorage.getItem("choosenLang");
    if(choosenLangStor.match(/^en$|^nl$/)) //If user choosed lang before
    {
      return choosenLangStor; //return choosed language
    }
    else
    {
      let browserLang = this.translate.getBrowserLang(); //get browser language
      return browserLang.match(/en|nl/) ? browserLang : 'nl'; //choose nl language if browser lang is different than en|nl
    }
  }
}
