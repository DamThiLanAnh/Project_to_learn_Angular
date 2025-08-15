import {Component, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {StudentModel} from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: StudentModel[] = [];

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((data: StudentModel[]) => {
      this.students = data;
    });
  }

  handleAddStudent(student: StudentModel) {
    this.studentService.addStudent(student).subscribe(() => {
      this.loadStudents();
    });
  }
}
