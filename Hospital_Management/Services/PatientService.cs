using Hospital_Management.Data;
using Hospital_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management.Services
{
    public class PatientService
    {
        private readonly HospitalDbContext _context;

        public PatientService(HospitalDbContext context)
        {
            _context = context;
        }

        // Register Patient
        public async Task<string> RegisterPatient(Patient patient)
        {
            var patientExists = await _context.Patient
                .AnyAsync(x => x.PatientEmail == patient.PatientEmail);

            if (patientExists)
            {
                return "Email already exists";
            }

            _context.Patient.Add(patient);

            await _context.SaveChangesAsync();

            return "Patient Registered Successfully";
        }

        // Patient Login
        public async Task<Patient?> LoginPatient(string email, string password)
        {
            return await _context.Patient.FirstOrDefaultAsync(x =>
                x.PatientEmail == email &&
                x.Password == password);
        }

        // Get All Patients
        public async Task<List<Patient>> GetAllPatients()
        {
            return await _context.Patient.ToListAsync();
        }

        // Get Patient By Id
        public async Task<Patient?> GetPatientById(int id)
        {
            return await _context.Patient.FindAsync(id);
        }
    }
}