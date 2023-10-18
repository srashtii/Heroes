import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of heroes';

  public languages = ['en' , 'fr'];
  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.langs = ["fr", "en"];
    translate.setDefaultLang('fr');
    translate.langs = this.languages;

    translate.use('fr');
  }

  public setLanguage(langue: string): void {
    this.translate.use(langue);
  }
}
