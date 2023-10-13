import { Injectable } from '@angular/core';
import { heroes } from './mock-heroes';
import { Hero } from './Hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  public getHeroes(): Observable<Hero[]> {
    this.messageService.add("Heroes fetched");
    return heroes;
  }
}
