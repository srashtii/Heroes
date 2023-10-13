import { Component, OnInit } from '@angular/core';
import { heroes } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import { MessageService } from '../messages.service';


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
  public selectedHero: Hero | null = null;
  public heroesList: Hero[] = [];
  constructor(private heroservice: HeroService, private messageService : MessageService) {

  }
  ngOnInit(): void {
    this.heroservice.getHeroes().subscribe(x => this.heroesList = x);
  }
  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
