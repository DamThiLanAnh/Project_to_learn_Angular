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
  page: number = 1;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  searchTerm: string = '';
  filteredStudents: StudentModel[] = [];

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data; // ban đầu hiển thị tất cả
    });
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  handleAddStudent(student: StudentModel) {
    this.studentService.addStudent(student).subscribe(() => {
      this.loadStudents();
    });
  }
}
