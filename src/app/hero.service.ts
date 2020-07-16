import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from './hero.model';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: obtida lista de herois');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    this.log(`obtido hero id=${id}.`);
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);

  }
}
