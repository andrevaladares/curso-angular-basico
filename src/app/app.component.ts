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

  constructor() {
    const token = localStorage.getItem('token');
    if (!token) {
      const randomToken = Math.random().toString(36).substr(-10);
      localStorage.setItem('token', randomToken);
    }
  }
}
