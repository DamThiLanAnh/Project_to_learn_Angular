import {Injectable} from '@angular/core';
import {StudentModel} from './student.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators'; // Import tap

@Injectable({providedIn: 'root'})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/student`; // Ensure correct API endpoint

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<StudentModel[]> {
    console.log('API URL:', this.apiUrl); // Log API URL
    return this.http.get<StudentModel[]>(this.apiUrl).pipe(
      tap((data: StudentModel[]) => console.log('API Response:', data)) // Log API response
    );
  }

  addStudent(student: StudentModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(this.apiUrl, student);
  }

  getStudentById(id: string): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${this.apiUrl}/${id}`);
  }

}
