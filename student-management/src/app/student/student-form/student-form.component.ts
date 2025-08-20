import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentModel} from '../student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent {
  @Output() add = new EventEmitter<StudentModel>();
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
      address: [''],
      dob: ['', Validators.required],
      phone: ['',  [
        Validators.required,
        Validators.pattern(/^0\d{9,10}$/)
      ]]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.add.emit(this.studentForm.value);
      this.studentForm.reset();
    }
  }
}
