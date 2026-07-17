import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DoctorComponentService } from './Services/doctor-component-service';
import { AppointmentComponentService } from '../appointment-component/Services/appointment-component-service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-doctor-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-component.html',
  styleUrl: './doctor-component.css'
})
export class DoctorComponent implements OnInit {

  private doctorService = inject(DoctorComponentService);
  private appointmentService = inject(AppointmentComponentService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  doctor: any;

  appointments: any[] = [];

  selectedAppointment: any = null;

  feedback = "";

  message = "";
  messageType = "";
  showMessage = false;

  ngOnInit(): void {

    const doctorData = localStorage.getItem("doctor");

    if (!doctorData) {
      this.router.navigate(['/home']);
      return;
    }

    this.doctor = JSON.parse(doctorData);

    this.loadAppointments();

  }

  // Load Doctor Appointments
  
  loadAppointments() {

    this.appointmentService
      .getDoctorAppointments(this.doctor.doctorId)
      .subscribe({

        next: (data) => {

          console.log(data);

          this.appointments = data;

          this.cd.detectChanges();

        },

        error: (err) => {

          console.log(err);

          this.showPopup("Unable to load appointments", "danger");
        }

      });

  }
  showPopup(message: string, type: string = "success") {

    this.message = message;
    this.messageType = type;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

  }
  
  // Open Feedback Dialog
  
  openFeedback(appointment: any) {

    if (appointment.status === 'Completed') {

      this.showPopup("Feedback has already been submitted.", "warning");

      return;

    }

    if (appointment.status === 'Cancelled') {

      this.showPopup("Cannot add feedback for a cancelled appointment.", "danger");

      return;

    }

    this.selectedAppointment = appointment;
    this.feedback = "";

  }

  // Submit Feedback
 
  submitFeedback() {

    if (!this.feedback.trim()) {

      this.showPopup("Please enter feedback", "warning");

      return;

    }

    this.appointmentService
      .addFeedback(
        this.selectedAppointment.appointmentId,
        this.feedback
      )
      .subscribe({

        next: (res) => {

          this.showPopup(String(res), "success");

          this.selectedAppointment = null;

          this.loadAppointments();

        },

        error: (err) => {

          this.showPopup(String(err.error), "danger");

        }

      });

  }

  // Close Dialog
  
  closeDialog() {

    this.selectedAppointment = null;

  }

  // Logout
  
  logout() {

    localStorage.removeItem("doctor");

    this.router.navigate(['/']);

  }

}
