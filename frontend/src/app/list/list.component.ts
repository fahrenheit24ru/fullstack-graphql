import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from './../types';
import { CourseService } from './../course.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input()
  courses: Observable<Course[]>;
  @Input()
  searchTerm: string;

  constructor(private _courseService: CourseService) {}

  ngOnInit() {
    this.courses = this._courseService.getAllCourses(this.searchTerm);
  }

  ngOnChanges() {
    this.courses = this._courseService.getAllCourses(this.searchTerm);
  }
}
