import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero.model';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;

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
}
