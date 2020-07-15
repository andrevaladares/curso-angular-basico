import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Hero} from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes: Hero[] = [
      {id: 1, name: 'Windstorm'},
      {id: 2, name: 'Spiderman'},
      {id: 3, name: 'Wonderwoman'},
      {id: 4, name: 'Ironman'},
      {id: 5, name: 'Hulk'},
      {id: 6, name: 'Captain America'},
    ];

    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes && heroes.length > 0
      ? Math.max( ...heroes.map(hero => hero.id)) + 1
      : 1;
  }

}
