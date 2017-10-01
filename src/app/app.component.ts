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
    translate.addLangs(["en", "nl"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|nl/) ? browserLang : 'nl');

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
  
}
