import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'prices',
  templateUrl: './app/Prices/prices.html'
})
export class PricesComponent implements OnInit {
  private oTranslation: Observable<any>;
  private translation: any;

  private pricesWoman: any;
  private pricesMan: any;
  private pricesExt: any;
  private pricesNails: any;
  private pricesChildren: any;
  private pricesWimpers: any;

  constructor(private translate: TranslateService,
  ) {

    this.oTranslation = this.translate.getTranslation(this.translate.currentLang);
  }

  ngOnInit(): void {
    this.oTranslation.subscribe(translation => {

      this.pricesWoman = translation.PRICES.WOMAN
      this.pricesMan = translation.PRICES.MAN
      this.pricesExt = translation.PRICES.EXTENSIONS
      this.pricesNails = translation.PRICES.NAILS
      this.pricesChildren = translation.PRICES.CHILDREN
      this.pricesWimpers = translation.PRICES.WIMPERS
    }
    )
  }

  public ngOnDestroy(): void {
    // this.Subscription.unsubscribe();
  };
}
