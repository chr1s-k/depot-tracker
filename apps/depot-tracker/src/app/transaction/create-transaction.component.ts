import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionService } from './transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTransactionDto } from '@chris-k-software/api-interfaces';
import { ActivatedRoute } from '@angular/router';

interface CsInputDefinition {
  control: FormControl;
  displayName: string;
  type: 'number' | 'text';
  errorInfo?: string;
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
  readonly fields: Record<
    keyof CreateTransactionDto | 'note',
    CsInputDefinition
  > = {
    assetId: {
      control: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      displayName: 'Asset id',
      type: 'number',
    },
    fee: {
      control: new FormControl('', [Validators.required, Validators.min(0)]),
      displayName: 'Fee',
      errorInfo: 'Must be greater or equal than 0',
      type: 'number',
    },
    unitPrice: {
      control: new FormControl('', [Validators.required, Validators.min(0)]),
      displayName: 'Unit price',
      errorInfo: 'Must be greater or equal than 0',
      type: 'number',
    },
    unitCount: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Unit count',
      errorInfo: 'Must be a number',
      type: 'number',
    },
    note: {
      control: new FormControl('', []),
      displayName: 'Note',
      type: 'text',
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

  onSaveTransaction() {
    const newTransactionDto: CreateTransactionDto = {
      assetId: +this.fields.assetId.control.value,
      fee: +this.fields.fee.control.value,
      unitCount: +this.fields.unitCount.control.value,
      unitPrice: +this.fields.unitPrice.control.value,
      note: this.fields.note.control.value,
    };
    this.transactionService.create(newTransactionDto).subscribe(
      () => {
        this.location.back();
      },
      (e) => console.error(e)
    );
  }
}
