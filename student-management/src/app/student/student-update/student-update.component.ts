import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {StudentModel} from '../student.model';
declare var bootstrap: any;

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnChanges {
  @Input() student: StudentModel | null = null;
  @Output() update = new EventEmitter<StudentModel>();

  editForm!: FormGroup;
  modalRef: any;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
      dateOfBirth: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      this.editForm.patchValue(this.student);
      const modalEl = document.getElementById('editStudentModal');
      if (modalEl) {
        this.modalRef = new bootstrap.Modal(modalEl);
        this.modalRef.show();
      }
    }
  }

  onSave() {
    const updatedStudent = this.editForm.value;
    this.update.emit(updatedStudent);
    if (this.modalRef) this.modalRef.hide();
  }
}
