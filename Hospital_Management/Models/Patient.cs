using Hospital_Management.Enum;

namespace Hospital_Management.Models
{
    public class Patient
    {
        public int PatientId { get; set; }

        public string? PatientName { get; set; }

        public string? PhoneNumber { get; set; }

        public Hospital Gender { get; set; }

        public int Age { get; set; }

        public BloodGroup BloodGroup { get; set; }

        public string? Password { get; set; }

        public string? PatientEmail { get; set; }

    }
}
