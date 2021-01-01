import { Component, OnInit } from '@angular/core';
import {
  MessageConfig,
  MessageTypeEnum,
  NotificationService,
} from './notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cs-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}
  messages$!: Observable<MessageConfig[]>;

  readonly MessageTypes = MessageTypeEnum;

  ngOnInit(): void {
    this.messages$ = this.notificationService.messages$;
  }

  onCloseMessage(message: MessageConfig) {
    this.notificationService.closeMessage(message);
  }
}
