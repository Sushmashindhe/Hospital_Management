using Hospital_Management.Data;


namespace Hospital_Management.Services
{
    public class AdminService
    {
        private readonly HospitalDbContext _context;

        public AdminService(HospitalDbContext context)
        {
            _context = context;
        }

        
        public async Task <string> AdminLogin(string adminEmail, string password)
        {
            if(adminEmail == "admin@gmail.com" && password == "admin")
            {
                return "Login successful";
            }
            else
            {
                return "Invalid username or password";
            }
        }
    }
}
