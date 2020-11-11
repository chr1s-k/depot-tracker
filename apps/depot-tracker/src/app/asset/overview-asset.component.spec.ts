import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAssetComponent } from './overview-asset.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OverviewAssetComponent', () => {
  let component: OverviewAssetComponent;
  let fixture: ComponentFixture<OverviewAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        RouterTestingModule,
      ],
      declarations: [OverviewAssetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
