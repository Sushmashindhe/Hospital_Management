import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponentService } from './Services/header-component-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent implements OnInit {

  departments: any[] = [];

  constructor(private service: HeaderComponentService) { }

  ngOnInit(): void {
    this.service.getAllDepartments().subscribe(res => {
      this.departments = res;
    });
  }
}
