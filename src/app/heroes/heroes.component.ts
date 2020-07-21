import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero.model';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  filter = '';

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onAdd(name: string) {
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      if (hero) {
        this.heroes.push(hero);
      }
    });
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(response => {
      if (typeof response !== 'undefined') {
        this.heroes = this.heroes.filter(heroItem => heroItem !== hero);
      }
    });
  }

  onFilter(term: string) {
    console.log(term);
    this.filter = term;
  }
}
