import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
