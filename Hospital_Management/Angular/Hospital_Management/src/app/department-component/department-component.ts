import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header-component/header-component';
import { HeaderComponentService } from '../header-component/Services/header-component-service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './department-component.html',
  styleUrls: ['./department-component.css']
})
export class DepartmentComponent implements OnInit {

  departments: any[] = [];

  constructor(private service: HeaderComponentService) { }

  ngOnInit(): void {
    this.service.getAllDepartments().subscribe(res => {
      this.departments = res;
    });
  }

}
