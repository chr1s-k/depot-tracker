import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAssetComponent } from './overview-asset.component';

describe('OverviewAssetComponent', () => {
  let component: OverviewAssetComponent;
  let fixture: ComponentFixture<OverviewAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewAssetComponent ]
    })
    .compileComponents();
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
