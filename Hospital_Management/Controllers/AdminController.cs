using Hospital_Management.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost]
        public async Task<string> AdminLogin(string adminEmail, string password)
        {
            return await _adminService.AdminLogin(adminEmail, password);
        }
    }
}

