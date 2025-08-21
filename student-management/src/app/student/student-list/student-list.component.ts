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
  selectedStudent: StudentModel | null = null;

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

  exportCSV() {
    const header = ['ID', 'Tên', 'Email', 'Địa chỉ', 'Ngày sinh', 'Số điện thoại'];
    const rows = this.filteredStudents.map(s => [
      s.id, s.name, s.email, s.address, s.dateOfBirth, s.phone
    ]);

    // Thêm BOM: \uFEFF
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"
      + [header, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
  }
  openEdit(student: StudentModel) {
    this.selectedStudent = { ...student }; // clone
  }

  handleUpdate(updatedStudent: StudentModel) {
    this.studentService.updateStudent(updatedStudent).subscribe(res => {
      const index = this.students.findIndex(s => s.id === res.id);
      if (index !== -1) this.students[index] = res;
    });
  }

}
