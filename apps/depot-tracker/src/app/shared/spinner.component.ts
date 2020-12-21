import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'cs-loader',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor(private spinnerService: SpinnerService) {}

  isVisible$: Observable<boolean> = undefined;

  ngOnInit(): void {
    this.isVisible$ = this.spinnerService.isVisible$;
  }
}
