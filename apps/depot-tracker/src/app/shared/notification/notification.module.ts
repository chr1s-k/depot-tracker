import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [NotificationComponent],
  providers: [NotificationService],
})
export class NotificationModule {}
