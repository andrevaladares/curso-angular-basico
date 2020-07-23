import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {Alert} from '../alert.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(public messageService: MessageService) { }

  close(alert: Alert) {
    this.messageService.close(alert);
  }
}
