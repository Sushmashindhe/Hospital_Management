using Hospital_Management.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_Management.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }

        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        public int DoctorId { get; set; }

        [ForeignKey("DoctorId")]
        public Doctor? Doctor { get; set; }

        public DateTime AppointmentDate { get; set; }

        public string? Reason { get; set; }

        public AppointmentStatus Status { get; set; }

        public string? FeedBack {  get; set; }
    }
}