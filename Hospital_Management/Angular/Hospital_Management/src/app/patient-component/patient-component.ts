import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PatientComponentService } from './Services/patient-component-service';
import { AppointmentComponentService } from '../appointment-component/Services/appointment-component-service';

@Component({
  selector: 'app-patient-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-component.html',
  styleUrl: './patient-component.css'
})
export class PatientComponent implements OnInit {

  private patientService = inject(PatientComponentService);
  private appointmentService = inject(AppointmentComponentService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  patient: any = {};

  doctors: any[] = [];

  appointments: any[] = [];

  showBooking = false;

  selectedDoctor: any = {};

  appointment = {
    patientId: 0,
    doctorId: 0,
    appointmentDate: '',
    reason: ''
  };
  message = '';
  messageType = ''; // success | danger | warning
  showMessage = false;

  showCancelPopup = false;
  appointmentToCancel = 0;

  ngOnInit(): void {

    const patientData = localStorage.getItem("patient");

    if (!patientData) {
      this.router.navigate(['/home']);
      return;
    }

    this.patient = JSON.parse(patientData);

    this.appointment.patientId = this.patient.patientId;

    this.loadDoctors();

    this.loadAppointments();

  }
  
  clearForm() {

    this.appointment = {
      patientId: this.patient.patientId,
      doctorId: 0,
      appointmentDate: '',
      reason: ''
    };

    this.selectedDoctor = {};

  }

  // Load Doctors

  loadDoctors() {

    this.patientService.getDoctors().subscribe({

      next: (data) => {

        this.doctors = data;

        this.cd.detectChanges();

      },

      error: () => {

        this.showPopup("Unable to load doctors", "danger");

      }

    });

  }

  // Load Patient Appointments
 
  loadAppointments() {

    this.appointmentService
      .getPatientAppointments(this.patient.patientId)
      .subscribe({

        next: (data) => {

          this.appointments = data;

          this.cd.detectChanges();

        }

      });

  }
 
  // Open Booking Dialog
 
  openBooking(doctor: any) {

    this.selectedDoctor = doctor;

    this.showBooking = true;

    this.appointment.doctorId = doctor.doctorId;

    this.appointment.reason = "";

    this.appointment.appointmentDate = "";

  }

  
  // Book Appointment
  
  bookAppointment() {

    if (!this.appointment.appointmentDate) {
      this.showPopup("Please select Appointment Date & Time", "warning");
      return;
    }

    if (!this.appointment.reason.trim()) {
      this.showPopup("Please enter the reason", "warning");
      return;
    }

    this.appointment.patientId = this.patient.patientId;
    this.appointment.doctorId = this.selectedDoctor.doctorId;

    this.appointmentService
      .bookAppointment(this.appointment)
      .subscribe({

        next: (res) => {

          this.showPopup(res, 'success');

          this.showBooking = false;

          this.clearForm();

          this.loadAppointments();

        },

        error: (err) => {

          console.error(err);

          this.showPopup(err.error || "Booking Failed", "danger");

        }

      });

  }
  
  // Close Dialog
  
  closeDialog() {

    this.showBooking = false;

    this.clearForm();

  }

  
  // Logout
  
  logout() {

    localStorage.removeItem("patient");

    this.router.navigate(['/']);

  }
  getStatus(status: any): string {

    if (!status) return "";

    return status;

  }
  cancelAppointment(id: number) {

    this.appointmentToCancel = id;

    this.showCancelPopup = true;

  }
  confirmCancel() {

    this.appointmentService
      .cancelAppointment(this.appointmentToCancel)
      .subscribe({

        next: (res) => {

          this.showPopup(String(res), "success");

          this.showCancelPopup = false;

          this.loadAppointments();

        },

        error: (err) => {

          this.showPopup(String(err.error), "danger");

          this.showCancelPopup = false;

        }

      });

  }
  closeCancelPopup() {

    this.showCancelPopup = false;

  }
  showPopup(message: string, type: string = 'success') {

    this.message = message;
    this.messageType = type;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

  }

}
