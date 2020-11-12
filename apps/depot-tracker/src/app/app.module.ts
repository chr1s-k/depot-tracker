import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { AssetModule } from './asset/asset.module';
import { assetRoutes } from './asset/asset.routes';
import { transactionRoutes } from './transaction/transaction.routes';
import { TransactionModule } from './transaction/transaction.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AssetModule,
    TransactionModule,
    RouterModule.forRoot([...assetRoutes, ...transactionRoutes]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
