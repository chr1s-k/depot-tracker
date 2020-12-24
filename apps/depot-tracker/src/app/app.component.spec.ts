import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AssetModule } from './asset/asset.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { SpinnerModule } from './shared/spinner.module';
import { NotificationModule } from './shared/notification.module';
import { AuthModule } from './shared/auth/auth.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        AssetModule,
        HttpClientModule,
        SpinnerModule,
        LayoutModule,
        AuthModule.forRoot(),
        NotificationModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
