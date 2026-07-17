import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeComponentService {

  private apiUrl = 'https://localhost:7173/api';

  constructor(private http: HttpClient) { }

  // Admin Login
  adminLogin(email: string, password: string) {

    return this.http.post(

      `${this.apiUrl}/Admin?adminEmail=${email}&password=${password}`,

      {},

      {

        responseType: 'text'

      }

    );

  }

  // Doctor Login

  doctorLogin(email: string, password: string): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/Doctor/Login?email=${email}&password=${password}`,

      {}

    );

  }

  
  // Patient Login

  patientLogin(email: string, password: string): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/Patient/Login?email=${email}&password=${password}`,

      {}

    );

  }
  registerPatient(patient: any) {
    return this.http.post(
      `${this.apiUrl}/Patient/Register`,
      patient,
      { responseType: 'text' }
    );
  }

}
