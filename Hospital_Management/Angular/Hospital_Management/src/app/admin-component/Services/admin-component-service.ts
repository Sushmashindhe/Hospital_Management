import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminComponentService {

  private departmentUrl = "https://localhost:7173/api/Department";
  private doctorUrl = "https://localhost:7173/api/Doctor";
  private patientUrl = "https://localhost:7173/api/Patient";
  private appointmentUrl = "https://localhost:7173/api/Appointment";

  getAllPatients() {
    return this.http.get<any[]>(this.patientUrl);
  }

  getAllAppointments() {
    return this.http.get<any[]>(this.appointmentUrl);
  }
  constructor(private http: HttpClient) { }

  //------------------ Department ------------------//

  getAllDepartments(): Observable<any> {
    return this.http.get(this.departmentUrl);
  }

  addDepartment(department: any): Observable<any> {
    return this.http.post(this.departmentUrl, department, {
      responseType: 'text'
    });
  }

  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put(`${this.departmentUrl}/${id}`, department, {
      responseType: 'text'
    });
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.departmentUrl}/${id}`, {
      responseType: 'text'
    });
  }

  //------------------ Doctor ------------------//

  getAllDoctors(): Observable<any> {
    return this.http.get(this.doctorUrl);
  }

  addDoctor(doctor: any): Observable<any> {
    return this.http.post(this.doctorUrl, doctor, {
      responseType: 'text'
    });
  }

  updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.doctorUrl}/${id}`, doctor, {
      responseType: 'text'
    });
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.doctorUrl}/${id}`, {
      responseType: 'text'
    });
  }
}
