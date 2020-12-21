import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { Provider } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LoaderComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: SpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      imports: [MatProgressSpinnerModule],
      providers: <Provider[]>[
        {
          provide: SpinnerService,
          useClass: SpinnerService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should have isVisible$ property', () => {
    expect(component).toHaveProperty('isVisible$');
  });

  it('should have spinnerService', () => {
    expect(component).toHaveProperty('spinnerService');
  });

  it('should set isVisible$ during ngOnInit', () => {
    expect(component.isVisible$).toEqual(undefined);
    component.ngOnInit();
    expect(component.isVisible$).toEqual(spinnerService.isVisible$);
  });
});
