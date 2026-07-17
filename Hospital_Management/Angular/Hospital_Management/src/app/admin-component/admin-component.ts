import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponentService } from './Services/admin-component-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-component.html',
  styleUrls: ['./admin-component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private adminService: AdminComponentService,
    private router: Router
  ) { }

  //================ Dashboard =================//

  departmentCount = 0;

  doctorCount = 0;

  patientCount = 0;

  appointmentCount = 0;

  currentView = "dashboard";

  //================ Popup =================//

  showMessage = false;

  message = "";

  messageType = "success";

  //================ Department =================//

  department = {

    departmentName: ''

  };

  departments: any[] = [];

  editDepartmentId = 0;

  //================ Doctor =================//

  doctor = {

    doctorName: '',

    departmentId: 0,

    phoneNumber: '',

    availability: null,

    password: '',

    doctorEmail: ''

  };

  doctors: any[] = [];

  editDoctorId = 0;

  //================ Validation =================//

  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  phonePattern = /^[0-9]{10}$/;

  passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

  //================ On Init =================//

  ngOnInit(): void {

    this.loadDashboard();

  }

  //================ Popup =================//

  showPopup(message: string, type: string) {

    this.message = message;

    this.messageType = type;

    this.showMessage = true;

    setTimeout(() => {

      this.showMessage = false;

    }, 2500);

  }


  //================ Dashboard =================//

  loadDashboard() {

    this.getAllDepartments();

    this.getAllDoctors();

    this.getAllPatients();

    this.getAllAppointments();

  }

  //================ Dashboard Counts =================//

  getAllPatients() {

    this.adminService.getAllPatients().subscribe({

      next: (res: any) => {

        this.patientCount = res.length;

      }

    });

  }

  getAllAppointments() {

    this.adminService.getAllAppointments().subscribe({

      next: (res: any) => {

        this.appointmentCount = res.length;

      }

    });

  }

  //================ Navigation =================//

  showDashboard() {

    this.currentView = "dashboard";

  }

  showDepartments() {

    this.currentView = "departments";

    this.getAllDepartments();

  }

  showDoctors() {

    this.currentView = "doctors";

    this.getAllDoctors();

    this.getAllDepartments();

  }
  //================ Department =================//

  getAllDepartments() {

    this.adminService.getAllDepartments().subscribe({

      next: (res: any) => {

        this.departments = [...res];

        this.departmentCount = this.departments.length;

      },

      error: () => {

        this.showPopup(
          "Unable to load Departments",
          "danger"
        );

      }

    });

  }

  // Add Department

  addDepartment() {

    const name = this.department.departmentName.trim();

    if (!name) {

      this.showPopup(
        "Department Name is required",
        "warning"
      );

      return;

    }

    if (!/^[A-Za-z ]+$/.test(name)) {

      this.showPopup(
        "Department Name should contain only alphabets",
        "warning"
      );

      return;

    }

    if (name.length < 3) {

      this.showPopup(
        "Department Name should contain at least 3 letters",
        "warning"
      );

      return;

    }

    this.adminService.addDepartment(this.department).subscribe({

      next: (res) => {

        this.showPopup(res, "success");

        this.department.departmentName = "";

        this.loadDashboard();

      },

      error: () => {

        this.showPopup(
          "Unable to add Department",
          "danger"
        );

      }

    });

  }
 
  // Edit Department

  editDepartment(item: any) {

    this.editDepartmentId = item.departmentId;

  }

  // Update Department

  updateDepartment(item: any) {

    const name = item.departmentName.trim();

    if (!name) {

      this.showPopup(
        "Department Name is required",
        "warning"
      );

      return;

    }

    if (!/^[A-Za-z ]+$/.test(name)) {

      this.showPopup(
        "Department Name should contain only alphabets",
        "warning"
      );

      return;

    }

    this.adminService
      .updateDepartment(item.departmentId, item)
      .subscribe({

        next: (res) => {

          this.showPopup(res, "success");

          this.editDepartmentId = 0;

          this.loadDashboard();

        },

        error: () => {

          this.showPopup(
            "Unable to update Department",
            "danger"
          );

        }

      });

  }

  // Delete Department

  deleteDepartment(id: number) {

    if (!confirm("Delete this Department ?")) {

      return;

    }

    this.adminService.deleteDepartment(id).subscribe({

      next: (res) => {

        this.showPopup(res, "success");

        this.loadDashboard();

      },

      error: () => {

        this.showPopup(
          "Unable to delete Department",
          "danger"
        );

      }

    });

  }
  //================ Doctor =================//

  getAllDoctors() {

    this.adminService.getAllDoctors().subscribe({

      next: (res: any) => {

        this.doctors = [...res];

        this.doctorCount = this.doctors.length;

      },

      error: () => {

        this.showPopup(
          "Unable to load Doctors",
          "danger"
        );

      }

    });

  }

  //-------------------------------------
  // Add Doctor
  //-------------------------------------

  addDoctor() {

    // Name

    if (!this.doctor.doctorName.trim()) {

      this.showPopup(
        "Doctor Name is required",
        "warning"
      );

      return;

    }

    if (!/^[A-Za-z ]+$/.test(this.doctor.doctorName)) {

      this.showPopup(
        "Doctor Name should contain only alphabets",
        "warning"
      );

      return;

    }

    // Phone

    if (!this.phonePattern.test(this.doctor.phoneNumber)) {

      this.showPopup(
        "Phone Number should contain exactly 10 digits",
        "warning"
      );

      return;

    }

    // Email

    if (!this.emailPattern.test(this.doctor.doctorEmail)) {

      this.showPopup(
        "Enter Valid Email",
        "warning"
      );

      return;

    }

    // Password

    if (!this.passwordPattern.test(this.doctor.password)) {

      this.showPopup(
        "Password must contain Uppercase, Lowercase and Number",
        "warning"
      );

      return;

    }

    // Department

    if (this.doctor.departmentId == 0) {

      this.showPopup(
        "Please Select Department",
        "warning"
      );

      return;

    }

    // Availability

    if (this.doctor.availability == null) {

      this.showPopup(
        "Please Select Availability",
        "warning"
      );

      return;

    }

    // Automatically add Dr.

    if (!this.doctor.doctorName.startsWith("Dr. ")) {

      this.doctor.doctorName =
        "Dr. " + this.doctor.doctorName.trim();

    }

    this.adminService.addDoctor(this.doctor).subscribe({

      next: (res) => {

        this.showPopup(
          res,
          "success"
        );

        this.clearDoctor();

        this.loadDashboard();

      },

      error: () => {

        this.showPopup(
          "Unable to Add Doctor",
          "danger"
        );

      }

    });

  }

  //-------------------------------------
  // Edit Doctor
  //-------------------------------------

  editDoctor(item: any) {

    this.editDoctorId = item.doctorId;

  }

  //-------------------------------------
  // Update Doctor
  //-------------------------------------

  updateDoctor(item: any) {

    if (!item.doctorName.trim()) {

      this.showPopup(
        "Doctor Name is required",
        "warning"
      );

      return;

    }

    if (!/^[A-Za-z ]+$/.test(item.doctorName.replace("Dr. ", ""))) {

      this.showPopup(
        "Doctor Name should contain only alphabets",
        "warning"
      );

      return;

    }

    if (!this.phonePattern.test(item.phoneNumber)) {

      this.showPopup(
        "Phone Number should contain exactly 10 digits",
        "warning"
      );

      return;

    }

    if (!this.emailPattern.test(item.doctorEmail)) {

      this.showPopup(
        "Invalid Email",
        "warning"
      );

      return;

    }

    if (!item.doctorName.startsWith("Dr. ")) {

      item.doctorName =
        "Dr. " + item.doctorName;

    }

    this.adminService.updateDoctor(
      item.doctorId,
      item
    )
      .subscribe({

        next: (res) => {

          this.showPopup(
            res,
            "success"
          );

          this.editDoctorId = 0;

          this.loadDashboard();

        },

        error: () => {

          this.showPopup(
            "Unable to Update Doctor",
            "danger"
          );

        }

      });

  }

  //-------------------------------------
  // Delete Doctor
  //-------------------------------------

  deleteDoctor(id: number) {

    if (!confirm("Delete this Doctor?")) {

      return;

    }

    this.adminService.deleteDoctor(id).subscribe({

      next: (res) => {

        this.showPopup(
          res,
          "success"
        );

        this.loadDashboard();

      },

      error: () => {

        this.showPopup(
          "Unable to Delete Doctor",
          "danger"
        );

      }

    });

  }

  //-------------------------------------
  // Clear Doctor Form
  //-------------------------------------

  clearDoctor() {

    this.doctor = {

      doctorName: '',

      departmentId: 0,

      phoneNumber: '',

      availability: null,

      password: '',

      doctorEmail: ''

    };

  }
  //================ Logout =================//

  logout() {

    if (!confirm("Are you sure you want to logout?")) {

      return;

    }

    this.router.navigate(['/']);

  }
}
