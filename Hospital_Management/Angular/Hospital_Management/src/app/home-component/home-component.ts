import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponentService } from './Services/home-component-service';
import { HeaderComponent } from '../header-component/header-component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent {

  constructor(
    private homeService: HomeComponentService,
    private router: Router
  ) { }

  // LOGIN

  selectedRole = '';

  loginEmail = '';

  loginPassword = '';

  showPassword = false;

  // REGISTER

  showPatientRegister = false;

  confirmPassword = '';

  patient = {

    patientName: '',

    phoneNumber: '',

    patientEmail: '',

    password: '',

    age: null as number | null,

    gender: null as number | null,

    bloodGroup: null as number | null

  };

  // POPUP
 
  showPopup = false;

  popupMessage = '';

  popupSuccess = true;

  private toastTimer: any;

  showToast(message: string, success: boolean = true) {

    this.popupMessage = message;

    this.popupSuccess = success;

    this.showPopup = true;

    clearTimeout(this.toastTimer);

    this.toastTimer = setTimeout(() => {

      this.showPopup = false;

    }, 2500);

  }

  // LOGIN
  
  login() {

    // Role Validation
    if (!this.selectedRole) {
      this.showToast("Please select Login Type", false);
      return;
    }

    // Email Validation
    if (!this.loginEmail.trim()) {
      this.showToast("Email is required", false);
      return;
    }

    // Password Validation
    if (!this.loginPassword.trim()) {
      this.showToast("Password is required", false);
      return;
    }

    switch (this.selectedRole) {

      case 'Admin':

        this.homeService
          .adminLogin(this.loginEmail, this.loginPassword)
          .subscribe({

            next: (res: string) => {

              if (res === "Login successful") {

                this.showToast("Welcome Admin!", true);

                setTimeout(() => {

                  this.router.navigate(['/admin-dashboard']);

                }, 1200);

              } else {

                this.showToast("Invalid Admin Email or Password", false);

              }

            },

            error: () => {

              this.showToast("Invalid Admin Email or Password", false);

            }

          });

        break;
      case 'Doctor':

        this.homeService
          .doctorLogin(this.loginEmail, this.loginPassword)
          .subscribe({

            next: (doctor: any) => {

              localStorage.setItem(
                "doctor",
                JSON.stringify(doctor)
              );

              this.showToast("Doctor Login Successful");

              setTimeout(() => {

                this.router.navigate(['/doctor-dashboard']);

              }, 1200);

            },

            error: () => {

              this.showToast("Invalid Doctor Credentials", false);

            }

          });

        break;

      case 'Patient':

        this.homeService
          .patientLogin(this.loginEmail, this.loginPassword)
          .subscribe({

            next: (patient: any) => {

              localStorage.setItem(
                "patient",
                JSON.stringify(patient)
              );

              this.showToast("Patient Login Successful");

              setTimeout(() => {

                this.router.navigate(['/patient-dashboard']);

              }, 1200);

            },

            error: () => {

              this.showToast("Invalid Patient Credentials", false);

            }

          });

        break;

    }

  }

  // SHOW REGISTER

  showRegister() {

    this.showPatientRegister = true;

  }

  // SHOW LOGIN
 
  showLogin() {

    this.showPatientRegister = false;

  }

  // REGISTER

  registerPatient() {

    if (!this.patient.patientName.trim()) {

      this.showToast("Patient Name is required", false);

      return;

    }

    if (!/^[A-Za-z ]+$/.test(this.patient.patientName)) {

      this.showToast("Name should contain only alphabets", false);

      return;

    }

    if (!/^[0-9]{10}$/.test(this.patient.phoneNumber)) {

      this.showToast("Phone Number must be exactly 10 digits", false);

      return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.patient.patientEmail)) {

      this.showToast("Enter Valid Email", false);

      return;

    }

    if (this.patient.password.length < 6) {

      this.showToast("Password must contain at least 6 characters", false);

      return;

    }

    if (this.patient.password !== this.confirmPassword) {

      this.showToast("Passwords do not match", false);

      return;

    }

    if (this.patient.age == null || this.patient.age < 1 || this.patient.age > 120) {

      this.showToast("Enter Valid Age", false);

      return;

    }

    if (this.patient.gender == null) {

      this.showToast("Please Select Gender", false);

      return;

    }

    if (this.patient.bloodGroup == null) {

      this.showToast("Please Select Blood Group", false);

      return;

    }

    this.homeService
      .registerPatient(this.patient)
      .subscribe({

        next: (res) => {

          this.showToast("Registration Successful");

          this.patient = {

            patientName: '',

            phoneNumber: '',

            patientEmail: '',

            password: '',

            age: null,

            gender: null,

            bloodGroup: null

          };

          this.confirmPassword = '';

          setTimeout(() => {

            this.showPatientRegister = false;

          }, 1200);

        },

        error: () => {

          this.showToast("Registration Failed", false);

        }

      });

  }

}
