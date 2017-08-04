import { Component } from '@angular/core';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.html',
})
export class AppComponent  { 
  name = 'Beauty Code Salon';

    constructor(private translate: TranslateService) {
    translate.addLangs(["en", "nl"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|nl/) ? browserLang : 'nl');
  
    
    $(document).ready(function(){
        $("body").removeClass('backgrounded');
    });
  }
}
