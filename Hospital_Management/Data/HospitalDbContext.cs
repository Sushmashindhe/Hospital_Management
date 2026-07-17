using Hospital_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management.Data;

public class HospitalDbContext : DbContext
{
    public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options)
    {
    }

    public DbSet<Patient> Patient { get; set; }

    public DbSet<Doctor> Doctors { get; set; }

    public DbSet<Appointment> Appointments { get; set; }

    public DbSet<Department> Department { get; set; }


}
