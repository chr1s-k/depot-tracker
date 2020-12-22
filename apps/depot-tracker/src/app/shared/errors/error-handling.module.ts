import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './global-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error-interceptor.service';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, NotificationModule],
  providers: [
    NotificationService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class ErrorHandlingModule {}
