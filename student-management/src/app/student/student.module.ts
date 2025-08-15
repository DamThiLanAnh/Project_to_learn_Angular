import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {StudentListComponent} from './student-list/student-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudentFormComponent} from './student-form/student-form.component';
@NgModule({
  declarations: [StudentListComponent, StudentFormComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [StudentListComponent, StudentFormComponent]
})
export class StudentModule {
}
