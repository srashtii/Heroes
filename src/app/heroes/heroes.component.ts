import { Component, OnInit } from '@angular/core';
import { heroes } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import { MessageService } from '../messages.service';
import { TranslateService } from '@ngx-translate/core';
//import { Observable, empty, of } from 'rxjs';

/*import { } from 'cl'*/


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }
  //public title: Observable<string> = of("");
  //public selectedHero: Hero | null = null;
  public heroesList: Hero[] = [];
  public loading: boolean = true;
  constructor(private heroservice: HeroService, private messageService: MessageService, private translateService: TranslateService) {

  }
  ngOnInit(): void {
    this.loading = true;
    this.heroservice.getHeroes().subscribe(
      x => {
        this.heroesList = x;
        this.loading = false
      });
    //this.title = this.translateService.get('title').subscribe();
  }
  //public onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  //  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //}
  public add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroservice.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroesList.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroesList = this.heroesList.filter(h => h !== hero);
    this.heroservice.deleteHero(hero.id).subscribe();
  }
}
