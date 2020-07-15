import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {Hero} from './hero.model';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes = HEROES;

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: obtida lista de herois');
    return of(this.heroes);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: obtido hero id=${id}`);
    return of(this.heroes.find(hero => hero.id === id));
  }
}
