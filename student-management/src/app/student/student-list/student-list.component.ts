import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { StudentModel } from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: StudentModel[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: StudentModel[]) => {
      this.students = data;
    });
  }
}
