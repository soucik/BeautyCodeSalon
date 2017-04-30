import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.html',
})
export class AppComponent  { 
  name = 'Beauty Code Salon';

  constructor(){
    
    $(document).ready(function(){
        $("body").removeClass('backgrounded');
    });
  }
}
