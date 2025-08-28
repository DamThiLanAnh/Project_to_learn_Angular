import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {CommonModule} from '@angular/common';
import { NoDataComponent } from './no-data/no-data.component';
@NgModule ({
  declarations: [ConfirmDialogComponent, NoDataComponent],
  imports: [CommonModule],
  exports: [ConfirmDialogComponent]
})
export class SharedModule { }
