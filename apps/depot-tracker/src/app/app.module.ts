import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { AssetModule } from './asset/asset.module';
import { assetRoutes } from './asset/asset.routes';
import { transactionRoutes } from './transaction/transaction.routes';
import { TransactionModule } from './transaction/transaction.module';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { SpinnerModule } from './shared/spinner.module';
import { SpinnerInterceptor } from './shared/spinner.interceptor';
import { ErrorHandlingModule } from './shared/errors/error-handling.module';
import { NotificationModule } from './shared/notification/notification.module';
import { AuthModule } from './shared/auth/auth.module';

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([...assetRoutes, ...transactionRoutes], {
      relativeLinkResolution: 'corrected',
    }),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    AuthModule.forRoot(),
    LayoutModule,
    TransactionModule,
    AssetModule,
    SpinnerModule,
    NotificationModule,
    ErrorHandlingModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
