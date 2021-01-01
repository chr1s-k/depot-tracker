import { ErrorHandler, Injectable } from '@angular/core';
import {
  MessageTypeEnum,
  NotificationService,
} from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notification: NotificationService) {}

  handleError(error: unknown): void {
    console.error('Error from global error handler', error);
    this.notification.showMessage(
      MessageTypeEnum.error,
      undefined,
      JSON.stringify(error)
    );
  }
}
