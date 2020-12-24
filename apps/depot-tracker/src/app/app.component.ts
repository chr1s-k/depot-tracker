import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { VERSION } from '../environments/version';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'chris-k-software-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (VERSION) {
      console.log('Hash:', VERSION.hash);
    } else {
      console.warn('No hash found.');
    }
    this.authService.init();
  }
}
