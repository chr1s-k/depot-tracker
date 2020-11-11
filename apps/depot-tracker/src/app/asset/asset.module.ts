import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAssetComponent } from './create-asset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { OverviewAssetComponent } from './overview-asset.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

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
  ],
})
export class AssetModule {}
