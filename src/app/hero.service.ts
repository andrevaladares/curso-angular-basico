import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './hero.model';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('Obtida a lista de herois')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(() => this.log(`obtido hero id=${id}.`)),
      catchError(this.handleError<Hero>('getHero'))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero, this.httpOptions).pipe(
      tap(() => this.log(`atualizado hero id=${hero.id}.`)),
      catchError(this.handleError<Hero>('updateHero'))
    );

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result);
    };
  }
}
