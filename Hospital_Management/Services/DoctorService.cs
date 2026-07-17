using Hospital_Management.Data;
using Hospital_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management.Services
{
    public class DoctorService
    {
        private readonly HospitalDbContext _context;

        public DoctorService(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<List<Doctor>> GetAllDoctorsAsync()
        {
            return await _context.Doctors
                                 .Include(d => d.Department)
                                 .ToListAsync();
        }

        public async Task<Doctor?> GetDoctorByIdAsync(int id)
        {
            return await _context.Doctors
                                 .Include(d => d.Department)
                                 .FirstOrDefaultAsync(d => d.DoctorId == id);
        }

        public async Task<string> AddDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);

            var department = await _context.Department.FindAsync(doctor.DepartmentId);

            if (department != null)
            {
                department.NumberOfDoctors++;
            }

            await _context.SaveChangesAsync();

            return "Doctor added successfully";
        }

        public async Task<string> UpdateDoctor(int doctorId, Doctor updatedDoctor)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);

            if (doctor == null)
                return "Doctor not found";

            if (doctor.DepartmentId != updatedDoctor.DepartmentId)
            {
                var oldDepartment = await _context.Department.FindAsync(doctor.DepartmentId);

                if (oldDepartment != null && oldDepartment.NumberOfDoctors > 0)
                {
                    oldDepartment.NumberOfDoctors--;
                }

                var newDepartment = await _context.Department.FindAsync(updatedDoctor.DepartmentId);

                if (newDepartment != null)
                {
                    newDepartment.NumberOfDoctors++;
                }
            }

            doctor.DoctorName = updatedDoctor.DoctorName;
            doctor.DepartmentId = updatedDoctor.DepartmentId;
            doctor.PhoneNumber = updatedDoctor.PhoneNumber;
            doctor.Password = updatedDoctor.Password;
            doctor.DoctorEmail = updatedDoctor.DoctorEmail;
            doctor.Availability = updatedDoctor.Availability;

            await _context.SaveChangesAsync();

            return "Doctor updated successfully";
        }

        public async Task<string> DeleteDoctor(int doctorId)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);

            if (doctor == null)
                return "Doctor not found";

            var department = await _context.Department.FindAsync(doctor.DepartmentId);

            if (department != null && department.NumberOfDoctors > 0)
            {
                department.NumberOfDoctors--;
            }

            _context.Doctors.Remove(doctor);

            await _context.SaveChangesAsync();

            return "Doctor deleted successfully";
        }

        public async Task<Doctor?> LoginDoctor(string email, string password)
        {
            return await _context.Doctors
                .Include(d => d.Department)
                .FirstOrDefaultAsync(d =>
                    d.DoctorEmail == email &&
                    d.Password == password);
        }
    }
}
