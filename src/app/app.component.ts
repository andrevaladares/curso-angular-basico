import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'Tour of Heroes';
  itensMenu: {caminho: string, texto: string}[] = [
    {caminho: '/dashboard', texto: 'Dashboard'},
    {caminho: '/heroes', texto: 'Herois'}
  ];
}
