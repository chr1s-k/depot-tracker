import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs_create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
