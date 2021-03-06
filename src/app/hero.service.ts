import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './hero.model';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {AlertType} from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    })
  };

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl, this.httpOptions).pipe(
      tap(() => this.log('Obtida a lista de herois')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(() => this.log(`obtido hero id=${id}.`)),
      catchError(this.handleError<Hero>('getHero'))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero, this.httpOptions).pipe(
      tap(() => this.log(`atualizado hero id=${hero.id}.`, AlertType.success)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

    addHero(hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
        tap((newHero) => this.log(`adicionado hero id=${newHero.id}.`, AlertType.success)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  // DELETE hero/id
  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.log(`apagado hero id=${hero.id}.`, AlertType.success)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // GET /heroes/?name=term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`, this.httpOptions).pipe(
      tap((heroes) => {
        heroes && heroes.length
          ? this.log(`Encontrado termo= ${term} e ${heroes.length} herois`)
          : this.log(`Não encontrado para o termo= ${term}`, AlertType.warning);
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
  }

  private log(message: string, type = AlertType.info) {
    this.messageService.add({message: `HeroService: ${message}`, type});

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`, AlertType.danger);

      return of(result);
    };
  }
}
