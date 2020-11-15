import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CreateAssetDto, Risk } from '@chris-k-software/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from './asset.service';
import { Location } from '@angular/common';

enum INPUT_TYPE {
  INPUT = 'input',
  DROPDOWN = 'dropdown',
}

interface CsInputDefinition {
  control: FormControl;
  displayName: string;
  errorInfo?: string;
  type: INPUT_TYPE;
}

interface RiskDropdownEntry {
  value: Risk;
}

@Component({
  selector: 'cs-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssetComponent implements OnInit {
  constructor(private assetService: AssetService, private location: Location) {}

  form: FormGroup;
  readonly fields: Record<keyof CreateAssetDto, CsInputDefinition> = {
    name: {
      control: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      displayName: 'Name',
      errorInfo: 'Please choose name with at least 3 characters',
      type: INPUT_TYPE.INPUT,
    },
    description: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Description',
      errorInfo: 'Please enter a description',
      type: INPUT_TYPE.INPUT,
    },
    risk: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Risk',
      errorInfo: 'Please choose a risk level',
      type: INPUT_TYPE.DROPDOWN,
    },
    location: {
      control: new FormControl('', []),
      displayName: 'Location',
      type: INPUT_TYPE.INPUT,
    },
    isin: {
      control: new FormControl('', []),
      displayName: 'Isin',
      type: INPUT_TYPE.INPUT,
    },
    wkn: {
      control: new FormControl('', []),
      displayName: 'Wkn',
      type: INPUT_TYPE.INPUT,
    },
  };

  readonly riskDropdown: RiskDropdownEntry[] = [
    { value: 'low' },
    { value: 'middle' },
    { value: 'high' },
  ];
  readonly inputType = INPUT_TYPE;

  ngOnInit(): void {
    this.form = new FormGroup(this.mapFieldsToControls());
    this.form.valueChanges.subscribe((value: CreateAssetDto) => {
      console.log(value);
    });
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

  onCreateAsset() {
    this.assetService.create(this.form.value).subscribe(
      () => this.location.back(),
      (e) => console.error(e)
    );
  }
}
