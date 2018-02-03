import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from "@angular/http";

interface IPrices {
  pricesWoman: any;
  pricesMan: any;
  pricesExt: any;
  pricesNails: any;
  pricesChildren: any;
  pricesWimpers: any;
}

@Component({
  selector: 'prices',
  templateUrl: './app/Prices/prices.html'
})
export class PricesComponent implements OnInit {
  @Input("hero") hero: any;

  private prices: any;
  private transPath: string = 'app/i18n/';

  constructor(
    private translate: TranslateService,
    private http: Http
  ) {

    translate.onLangChange.subscribe((event: any) => {
      this.doTranslation(event.translations.PRICES);
    });
    this.doTranslation(this.getLang(this.translate.currentLang));

    // translate.getTranslation(this.translate.currentLang).subscribe(oTranslations => {
    //   this.doTranslation(oTranslations)
    // }
    // )
  }

  doTranslation(prices: any) {
    this.prices = prices;
    // console.log('do trans');
    // console.log(this.prices);
  }
  getLang(lang: string) {
    this.http.get('app/i18n/' + lang + '.json')
      .toPromise()
      .then((translation:any) => {
        return translation.json();
      }).then((translationJson: any) => {
        this.prices = translationJson.PRICES;
        // console.log(translationJson.PRICES);
      }
      )
  }
  ngOnInit(): void {
    //console.log(this.hero);
  }

  public ngOnDestroy(): void {
    // this.Subscription.unsubscribe();
  };
}
