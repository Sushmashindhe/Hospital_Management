using Hospital_Management.Data;
using Hospital_Management.Enum;
using Hospital_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management.Services
{
    public class AppointmentService
    {
        private readonly HospitalDbContext _context;

        public AppointmentService(HospitalDbContext context)
        {
            _context = context;
        }

        // Get All Appointments
        public async Task<List<Appointment>> GetAllAppointments()
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .ToListAsync();
        }

        // Get Appointment By Id
        public async Task<Appointment?> GetAppointmentById(int id)
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.AppointmentId == id);
        }

        // Book Appointment
        public async Task<string> BookAppointment(Appointment appointment)
        {
            // Always set new appointment status to Scheduled
            appointment.Status = AppointmentStatus.Scheduled;

            _context.Appointments.Add(appointment);

            await _context.SaveChangesAsync();

            return "Appointment Booked Successfully";
        }
        // Update Appointment
        public async Task<string> UpdateAppointment(int id, Appointment updatedAppointment)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
                return "Appointment Not Found";

            appointment.PatientId = updatedAppointment.PatientId;
            appointment.DoctorId = updatedAppointment.DoctorId;
            appointment.AppointmentDate = updatedAppointment.AppointmentDate;
            appointment.Reason = updatedAppointment.Reason;
            appointment.Status = updatedAppointment.Status;

            await _context.SaveChangesAsync();

            return "Appointment Updated Successfully";
        }

        // Delete Appointment
        public async Task<string> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
                return "Appointment Not Found";

            _context.Appointments.Remove(appointment);

            await _context.SaveChangesAsync();

            return "Appointment Deleted Successfully";
        }

        public async Task<string> AddFeedback(int appointmentId, string? feedback)
        {
            var appointment = await _context.Appointments.FindAsync(appointmentId);

            if (appointment == null)
                return "Appointment Not Found";

            if (appointment.Status == AppointmentStatus.Completed)
                return "Feedback has already been submitted.";

            if (appointment.Status == AppointmentStatus.Cancelled)
                return "Cannot add feedback for a cancelled appointment.";

            appointment.FeedBack = feedback;
            appointment.Status = AppointmentStatus.Completed;

            await _context.SaveChangesAsync();

            return "Feedback Added Successfully";
        }
        public async Task<List<Appointment>> GetPatientAppointments(int patientId)
        {
            return await _context.Appointments
                .Include(a => a.Doctor)
                .ThenInclude(d => d.Department)
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }
        public async Task<List<Appointment>> GetDoctorAppointments(int doctorId)
        {
            return await _context.Appointments
    .Include(a => a.Patient)
    .Include(a => a.Doctor)
        .ThenInclude(d => d.Department)
    .Where(a => a.DoctorId == doctorId)
    .ToListAsync();
        }
        public async Task<string> CancelAppointment(int appointmentId)
        {
            var appointment = await _context.Appointments.FindAsync(appointmentId);

            if (appointment == null)
                return "Appointment Not Found";

            if (appointment.Status == AppointmentStatus.Completed)
                return "Completed appointments cannot be cancelled.";

            if (appointment.Status == AppointmentStatus.Cancelled)
                return "Appointment is already cancelled.";

            appointment.Status = AppointmentStatus.Cancelled;

            await _context.SaveChangesAsync();

            return "Appointment Cancelled Successfully";
        }
    }
}