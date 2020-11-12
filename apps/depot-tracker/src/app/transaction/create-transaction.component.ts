import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionService } from './transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTransactionDto } from '@chris-k-software/api-interfaces';
import { ActivatedRoute } from '@angular/router';

interface CsInputDefinition {
  control: FormControl;
  displayName: string;
  errorInfo: string;
}

@Component({
  selector: 'cs-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  readonly fields: Record<keyof CreateTransactionDto, CsInputDefinition> = {
    assetId: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Asset id',
      errorInfo: 'Please choose something useful',
    },
    fee: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Fee',
      errorInfo: 'Please choose something useful',
    },
    unitPrice: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Unit price',
      errorInfo: 'Please choose something useful',
    },
    unitCount: {
      control: new FormControl('', [Validators.required]),
      displayName: 'unit count',
      errorInfo: 'Please choose something useful',
    },
  };

  ngOnInit(): void {
    this.form = new FormGroup(this.mapFieldsToControls());
    this.form.valueChanges.subscribe((value: CreateTransactionDto) => {
      console.log(value);
    });
    this.fields.assetId.control.setValue(
      this.route.snapshot.paramMap.get('id')
    );
  }

  keepKeyOrder() {
    return 0;
  }

  private mapFieldsToControls() {
    return Object.entries(this.fields).reduce(
      (acc, entry) => ({ ...acc, ...{ [entry[0]]: entry[1].control } }),
      {}
    );
  }

  onCreateTransaction() {
    const newTransactionDto: CreateTransactionDto = {
      assetId: +this.fields.assetId.control.value,
      fee: +this.fields.fee.control.value,
      unitCount: +this.fields.unitCount.control.value,
      unitPrice: +this.fields.unitPrice.control.value,
    };
    this.transactionService.create(newTransactionDto).subscribe(
      (newTransaction) => console.log(newTransaction),
      (e) => console.error(e)
    );
  }
}
