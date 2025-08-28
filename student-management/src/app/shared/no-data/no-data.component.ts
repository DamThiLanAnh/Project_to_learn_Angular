import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {

  @Input() message: string = 'No students at this time';
  @Input() img: string = 'src/app/shared/constants/no-data';

}
