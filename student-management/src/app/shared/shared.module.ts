import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {CommonModule} from '@angular/common';
@NgModule ({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule],
  exports: [ConfirmDialogComponent]
})
export class SharedModule { }
