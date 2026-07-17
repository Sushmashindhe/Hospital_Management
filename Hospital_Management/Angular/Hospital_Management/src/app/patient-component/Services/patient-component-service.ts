import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientComponentService {

  private http = inject(HttpClient);

  private patientApi = 'https://localhost:7173/api/Patient';
  private doctorApi = 'https://localhost:7173/api/Doctor';

  constructor() { }

  // ==========================
  // PATIENT LOGIN
  // ==========================
  patientLogin(email: string, password: string): Observable<any> {

    return this.http.post<any>(
      `${this.patientApi}/Login?email=${email}&password=${password}`,
      {}
    );

  }

  // ==========================
  // GET PATIENT BY ID
  // ==========================
  getPatientById(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.patientApi}/${id}`
    );

  }

  // ==========================
  // GET ALL DOCTORS
  // ==========================
  getDoctors(): Observable<any[]> {

    return this.http.get<any[]>(
      this.doctorApi
    );

  }

  // ==========================
  // GET DOCTOR BY ID
  // ==========================
  getDoctorById(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.doctorApi}/${id}`
    );

  }

}
