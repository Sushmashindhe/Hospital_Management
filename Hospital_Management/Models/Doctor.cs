using Hospital_Management.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_Management.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }

        public int DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public Department? Department { get; set; }
       
        public string PhoneNumber { get; set; }
        public Availability Availability { get; set; }

        public string Password { get; set; }

        public string DoctorEmail { get; set; }


    }
}
