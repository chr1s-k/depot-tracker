import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CreateAssetDto } from '@chris-k-software/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from './asset.service';
import { Location } from '@angular/common';

interface CsInputDefinition {
  control: FormControl;
  displayName: string;
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
  readonly fields: Record<keyof CreateAssetDto, CsInputDefinition> = {
    name: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Name',
      errorInfo: 'Please choose something useful',
    },
    description: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Description',
      errorInfo: 'Please choose something useful',
    },
    location: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Location',
      errorInfo: 'Please choose something useful',
    },
    risk: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Risk',
      errorInfo: 'Please choose something useful',
    },
    isin: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Isin',
      errorInfo: 'Please choose something useful',
    },
    wkn: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Wkn',
      errorInfo: 'Please choose something useful',
    },
  };

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
