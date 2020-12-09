import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messagesSubject = new BehaviorSubject<MessageConfig[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private messages: MessageConfig[] = [];

  showMessage(
    type: MessageTypeEnum,
    timeoutInMs: number | undefined = undefined,
    ...texts: string[]
  ): void {
    const newMessageConfig: MessageConfig = { type, texts };
    this.messages.push(newMessageConfig);
    this.publishMessages();
    if (timeoutInMs) {
      setTimeout(() => {
        this.closeMessage(newMessageConfig);
      }, timeoutInMs);
    }
  }

  closeMessage(message: MessageConfig): void {
    this.messages = this.messages.filter((msg) => msg !== message);
    this.publishMessages();
  }

  closeAllMessages(): void {
    this.messages = [];
    this.publishMessages();
  }

  private publishMessages() {
    this.messagesSubject.next(this.messages);
  }
}

export enum MessageTypeEnum {
  error = 'error',
  info = 'info',
  success = 'success',
}

export interface MessageConfig {
  type: MessageTypeEnum;
  texts: string[];
}
