using Hospital_Management.Data;
using Hospital_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management.Services
{
    public class DepartmentService
    {
        private readonly HospitalDbContext _context;

        public DepartmentService(HospitalDbContext context)
        {
            _context = context;
        }

        // Get all departments
        public async Task<List<Department>> GetAllDepartments()
        {
            var departments = await _context.Department.ToListAsync();

            bool updated = false;

            foreach (var department in departments)
            {
                int count = await _context.Doctors
                    .CountAsync(d => d.DepartmentId == department.DepartmentId);

                if (department.NumberOfDoctors != count)
                {
                    department.NumberOfDoctors = count;
                    updated = true;
                }
            }

            if (updated)
            {
                await _context.SaveChangesAsync();
            }

            return departments;
        }

        // Get department by Id
        //public async Task<Department?> GetDepartmentById(int departmentId)
        //{
        //    return await _context.Department.FindAsync(departmentId);
        //}

        // Add department
        public async Task<string> AddDepartment(Department department)
        {
            await _context.Department.AddAsync(department);
            await _context.SaveChangesAsync();

            return "Department added successfully.";
        }

        // Update department
        public async Task<string> UpdateDepartment(int departmentId, Department updatedDepartment)
        {
            var department = await _context.Department.FindAsync(departmentId);

            if (department == null)
            {
                return "Department not found.";
            }

            department.DepartmentName = updatedDepartment.DepartmentName;
          

            await _context.SaveChangesAsync();

            return "Department updated successfully.";
        }

        // Delete department
        public async Task<string> DeleteDepartment(int departmentId)
        {
            var department = await _context.Department.FindAsync(departmentId);

            if (department == null)
            {
                return "Department not found.";
            }

            _context.Department.Remove(department);
            await _context.SaveChangesAsync();

            return "Department deleted successfully.";
        }
    }
}