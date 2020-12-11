import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAssetComponent } from './overview-asset.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetModule } from './asset.module';
import { NgxsModule } from '@ngxs/store';

describe('OverviewAssetComponent', () => {
  let component: OverviewAssetComponent;
  let fixture: ComponentFixture<OverviewAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AssetModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
      ],
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

  it('should have properties', () => {
    expect(component).toHaveProperty('diagramOptions');
    expect(component).toHaveProperty('columns');
  });
});
