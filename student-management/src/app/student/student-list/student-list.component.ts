import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
  searchTerm: string = '';
  filteredStudents: StudentModel[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data;
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

  goToDetail(studentId: string) {
    // console.log('goToDetail:', studentId);
    this.router.navigate(['/students', studentId]);
  }
}
