import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CreateAssetDto, Quote } from '@chris-k-software/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, mergeMap, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AssetCreate, AssetCreateKeep } from './asset.actions';
import { YahooService } from './yahoo.service';
import { AssetState } from './asset.state';
import { isDefined } from 'class-validator';

enum INPUT_TYPE {
  INPUT = 'input',
  DROPDOWN = 'dropdown',
  AUTOCOMPLETE = 'autocomplete',
}

interface CsInputDefinition {
  control: FormControl;
  displayName: string;
  errorInfo?: string;
  element: AutocompleteElement | DropdownElement | InputElement;
}
interface AutocompleteElement {
  type: INPUT_TYPE.AUTOCOMPLETE;
  filteredList$: Observable<unknown>;
}
interface DropdownElement {
  type: INPUT_TYPE.DROPDOWN;
  entries: { value: string }[];
}
interface InputElement {
  type: INPUT_TYPE.INPUT;
}

@Component({
  selector: 'cs-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssetComponent implements OnInit {
  constructor(
    private yahooService: YahooService,
    private store: Store,
    private location: Location
  ) {}

  @Select(AssetState.getCreateAssetState) createAssetState$: Observable<
    CreateAssetDto
  >;

  form!: FormGroup;
  readonly fields: Record<keyof CreateAssetDto, CsInputDefinition> = {
    name: {
      control: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      displayName: 'Name',
      errorInfo: 'Please choose name with at least 3 characters',
      element: {
        type: INPUT_TYPE.AUTOCOMPLETE,
        filteredList$: new BehaviorSubject([]),
      },
    },
    description: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Description',
      errorInfo: 'Please enter a description',
      element: {
        type: INPUT_TYPE.INPUT,
      },
    },
    risk: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Risk',
      errorInfo: 'Please choose a risk level',
      element: {
        type: INPUT_TYPE.DROPDOWN,
        entries: [{ value: 'low' }, { value: 'middle' }, { value: 'high' }],
      },
    },
    type: {
      control: new FormControl('', [Validators.required]),
      displayName: 'Asset type',
      errorInfo: 'Please choose an asset type',
      element: {
        type: INPUT_TYPE.DROPDOWN,
        entries: [
          { value: 'cash' },
          { value: 'bond' },
          { value: 'stock' },
          { value: 'commodity' },
        ],
      },
    },
    location: {
      control: new FormControl('', []),
      displayName: 'Location',
      element: {
        type: INPUT_TYPE.INPUT,
      },
    },
    isin: {
      control: new FormControl('', [
        Validators.pattern('([A-Z]{2})((?![A-Z]{10}\\b)[A-Z0-9]{10})'),
      ]),
      displayName: 'Isin',
      errorInfo: 'Not a valid Isin',
      element: {
        type: INPUT_TYPE.INPUT,
      },
    },
    wkn: {
      control: new FormControl('', []),
      displayName: 'Wkn',
      element: {
        type: INPUT_TYPE.INPUT,
      },
    },
    tickerSymbol: {
      control: new FormControl('', []),
      displayName: 'Symbol',
      element: {
        type: INPUT_TYPE.AUTOCOMPLETE,
        filteredList$: new BehaviorSubject([]),
      },
    },
  };

  readonly inputType = INPUT_TYPE;

  ngOnInit(): void {
    this.setupForm();
    this.setupTypeahead();
    this.fillInState();
    this.attachStateKeep();
  }

  private attachStateKeep() {
    this.form.valueChanges.subscribe((formvalue) => {
      this.store.dispatch(new AssetCreateKeep(formvalue));
    });
  }

  private setupForm() {
    this.form = new FormGroup(this.mapFieldsToControls());
  }

  private fillInState() {
    this.createAssetState$
      .pipe(
        filter((value) => isDefined(value)),
        take(1)
      )
      .subscribe((value) => this.form.reset(value));
  }

  private setupTypeahead() {
    if ('filteredList$' in this.fields.name.element) {
      this.fields.name.element.filteredList$ = this.fields.name.control.valueChanges.pipe(
        debounceTime(300),
        filter((val: string) => val != null && val.length > 0),
        mergeMap((v) => this.yahooService.symbolTypeahead$(v))
      );
    }
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
    this.store.dispatch(new AssetCreate(this.form.value)).subscribe(
      () => this.location.back(),
      (e) => console.error(e)
    );
  }

  onCancel() {
    this.location.back();
  }

  onSelectName(option: Quote) {
    this.fields.tickerSymbol.control.setValue(option.symbol);
    this.fields.description.control.setValue(
      `${option.exchange} ${option.quoteType} ${option.symbol}`
    );
  }

  onReset() {
    this.form.reset();
  }
}
