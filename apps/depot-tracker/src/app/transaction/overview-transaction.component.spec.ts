import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTransactionComponent } from './overview-transaction.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('OverviewTransactionComponent', () => {
  let component: OverviewTransactionComponent;
  let fixture: ComponentFixture<OverviewTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [OverviewTransactionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
