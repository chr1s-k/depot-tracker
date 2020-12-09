import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VERSION } from '../environments/version';

@Component({
  selector: 'chris-k-software-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    if (VERSION) {
      console.log('Hash:', VERSION.hash);
    } else {
      console.warn('No hash found.');
    }
  }
}
