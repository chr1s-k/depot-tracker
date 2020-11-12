import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAsset } from '@chris-k-software/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from './asset.service';
import { Location } from '@angular/common';

interface CsInputDefinition {
  control: FormControl;
  name: string;
  errorInfo: string;
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
  readonly fields: Record<keyof IAsset, CsInputDefinition> = {
    name: {
      control: new FormControl('', [Validators.required]),
      name: 'Name',
      errorInfo: 'Please choose something useful',
    },
    description: {
      control: new FormControl('', [Validators.required]),
      name: 'Description',
      errorInfo: 'Please choose something useful',
    },
    location: {
      control: new FormControl('', [Validators.required]),
      name: 'Location',
      errorInfo: 'Please choose something useful',
    },
    risk: {
      control: new FormControl('', [Validators.required]),
      name: 'Risk',
      errorInfo: 'Please choose something useful',
    },
    isin: {
      control: new FormControl('', [Validators.required]),
      name: 'Isin',
      errorInfo: 'Please choose something useful',
    },
    wkn: {
      control: new FormControl('', [Validators.required]),
      name: 'Wkn',
      errorInfo: 'Please choose something useful',
    },
  };

  ngOnInit(): void {
    this.form = new FormGroup(this.mapFieldsToControls());
    this.form.valueChanges.subscribe((value: IAsset) => {
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
