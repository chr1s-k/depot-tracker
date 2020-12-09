import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AssetModule,
    TransactionModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    RouterModule.forRoot([...assetRoutes, ...transactionRoutes], {
      relativeLinkResolution: 'corrected',
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
