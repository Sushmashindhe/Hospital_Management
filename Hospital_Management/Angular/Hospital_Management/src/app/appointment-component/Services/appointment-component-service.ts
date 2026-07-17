import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentComponentService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7173/api/Appointment';
  // Change the port if your ASP.NET API uses a different one

  // Get all appointments
  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get appointment by ID
  getAppointmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Book Appointment
  bookAppointment(appointment: any): Observable<string> {
    return this.http.post(
      this.apiUrl,
      appointment,
      { responseType: 'text' as 'text' }
    );
  }


  // Update Appointment
  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }

  // Delete Appointment
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Add Feedback
  addFeedback(id: number, feedback: string): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/Feedback/${id}`,
      { feedBack: feedback },
      { responseType: 'text' as 'text' }
    );
  }

  // Patient Appointment History
  getPatientAppointments(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/Patient/${patientId}`
    );
  }

  // Doctor Appointment History
  getDoctorAppointments(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/Doctor/${doctorId}`
    );
  }
  cancelAppointment(id: number): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/Cancel/${id}`,
      {},
      { responseType: 'text' as 'text' }
    );
  }
}
