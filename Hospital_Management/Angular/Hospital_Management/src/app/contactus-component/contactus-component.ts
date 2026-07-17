import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header-component/header-component';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './contactus-component.html',
  styleUrls: ['./contactus-component.css']
})
export class ContactusComponent {

}
