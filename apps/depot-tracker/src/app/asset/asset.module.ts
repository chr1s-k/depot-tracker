import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { CreateAssetComponent } from './create-asset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { OverviewAssetComponent } from './overview-asset.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AssetService } from './asset.service';

@NgModule({
  declarations: [CreateAssetComponent, OverviewAssetComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatAutocompleteModule,
  ],
  providers: [DatePipe, CurrencyPipe, AssetService],
})
export class AssetModule {}
