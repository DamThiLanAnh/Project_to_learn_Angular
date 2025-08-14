import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [StudentListComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
  ],
  exports: [StudentListComponent]
})
export class StudentModule { }
