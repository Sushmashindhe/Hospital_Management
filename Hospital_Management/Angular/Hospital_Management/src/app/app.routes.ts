import { Routes } from '@angular/router';

import { HomeComponent } from './home-component/home-component';
import { AdminComponent } from './admin-component/admin-component';
import { DoctorComponent } from './doctor-component/doctor-component';
import { PatientComponent } from './patient-component/patient-component';
import { AboutComponent } from './about-component/about-component';
import { DepartmentComponent } from './department-component/department-component';
import { ContactusComponent } from './contactus-component/contactus-component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminComponent
  },
  {
    path: 'doctor-dashboard',
    component: DoctorComponent
  },
  {
    path: 'patient-dashboard',
    component: PatientComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'departments',
    component: DepartmentComponent
  },

  {
    path: 'contact',
    component: ContactusComponent
  },

  
];
