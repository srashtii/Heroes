import { Injectable } from '@angular/core';
import { heroes } from './mock-heroes';
import { Hero } from './Hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  //  // Error handling will be added in the next step of the tutorial.
  //  const hero = heroes.find(h => h.id === id)!;
  //  this.messageService.add(`HeroService: fetched hero id=${id}`);
  //  return of(hero);
  //}
  /** GET hero by id. Will 404 if id not found */

  private heroesUrl = 'api/heroes';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private messageService: MessageService) { }
  //public getHeroes(): Observable<Hero[]> {
  //  //this.messageService.add("Heroes fetched");
  //  //return of(heroes);
  //  return this.http.get<Hero[]>(this.heroesUrl)
  //    .pipe(
  //      catchError(this.handleError<Hero[]>('getHeroes', []))
  //    );
  //}
  /** GET heroes from the server */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  //public getHero(id: number): Observable<Hero> {
  //  // For now, assume that a hero with the specified `id` always exists.
  //  // Error handling will be added in the next step of the tutorial.
  //  const hero = heroes.find(h => h.id === id)!;
  //  this.messageService.add(`HeroService: fetched hero id=${id}`);
  //  return of(hero);
  //}
  /** GET hero by id. Will 404 if id not found */
  public getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /** PUT: update the hero on the server */
  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );

  }


  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** DELETE: delete the hero from the server */
  public deleteHero(id: number): Observable<void> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<void>('deleteHero'))
    );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  //pipe is used for map, filter and tap operators
  //he tap operator returns a new observable which is a mirror copy of the source observable.
  //We use it mostly for debugging purposes( for example for logging the values of observable as shown below).
  public searchHeroes(term: string): Observable<Hero[]> {

    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(tap(x => {
        x.length ? this.log(`found heroes matching ${term}`) :
          this.log(`no heroes found`);
      }
      ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
  };
}
