import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorComponentService {

  private http = inject(HttpClient);

  private doctorApi = 'https://localhost:7173/api/Doctor';

  constructor() { }

  // =====================
  // LOGIN
  // =====================

  doctorLogin(email: string, password: string): Observable<any> {

    return this.http.post<any>(
      `${this.doctorApi}/Login?email=${email}&password=${password}`,
      {}
    );

  }

  // =====================
  // GET DOCTOR BY ID
  // =====================

  getDoctorById(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.doctorApi}/${id}`
    );

  }

}
