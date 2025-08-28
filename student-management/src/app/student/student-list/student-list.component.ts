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
  page = 1;
  searchTerm = '';
  selectedStudent: StudentModel | null = null;
  studentToDelete: StudentModel | null = null;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  get filteredStudents(): StudentModel[] {
    if (!this.searchTerm) return this.students;
    const lower = this.searchTerm.toLowerCase();
    return this.students.filter(student =>
      student.name.toLowerCase().includes(lower) ||
      student.email.toLowerCase().includes(lower)
    );
  }

  handleAddStudent(student: StudentModel): void {
    this.studentService.addStudent(student).subscribe(() => {
      this.loadStudents();
      const modalEl = document.getElementById('addStudentModal');
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    });
  }

  goToDetail(studentId: string): void {
    this.router.navigate(['/students', studentId]);
  }

  openDeleteModal(student: StudentModel, event: any): void {
    event.stopPropagation();
    this.studentToDelete = student;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }


  confirmDelete(): void {
    if (!this.studentToDelete) return;
    this.studentService.deleteStudent(this.studentToDelete.id).subscribe(() => {
      this.loadStudents();
      this.studentToDelete = null;

      const modalEl = document.getElementById('deleteModal');
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    });
  }

  exportCSV(): void {
    const header = ['ID', 'Tên', 'Email', 'Địa chỉ', 'Ngày sinh', 'Số điện thoại'];
    const rows = this.filteredStudents.map(s => [
      s.id, s.name, s.email, s.address, s.dateOfBirth, s.phone
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF"
      + [header, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "students.csv";
    link.click();
  }

  openEdit(student: StudentModel,  event: any): void {
    event.stopPropagation();
    // console.log(student)
    this.selectedStudent = {...student};
  }

  handleUpdate(updatedStudent: StudentModel): void {
    this.studentService.updateStudent(updatedStudent).subscribe(() => {
      this.loadStudents();
      this.selectedStudent = null;
    });
  }
}
