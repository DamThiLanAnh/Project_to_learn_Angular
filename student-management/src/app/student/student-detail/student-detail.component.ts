import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../student.service';
import {StudentModel} from '../student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  student: StudentModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getStudentById(id).subscribe(data => {
        this.student = data;
      });
    }
  }
}
