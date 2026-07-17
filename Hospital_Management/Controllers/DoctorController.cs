using Hospital_Management.Models;
using Hospital_Management.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorService _doctorService;

        public DoctorController(DoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _doctorService.GetAllDoctorsAsync();
            return new OkObjectResult(doctors);
        }
        [HttpPost]  
        public async Task<IActionResult> AddDoctor([FromBody] Doctor doctor)
        {
            var result = await _doctorService.AddDoctor(doctor);
            return Ok(result);
        }
       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            var doctor = await _doctorService.GetDoctorByIdAsync(id);
            if (doctor == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(doctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] Doctor updatedDoctor)
        {
            var doctor = await _doctorService.UpdateDoctor(id, updatedDoctor);
            if (doctor == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(doctor);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var result = await _doctorService.DeleteDoctor(id);

            if (result == "Doctor not found")
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var doctor = await _doctorService.LoginDoctor(email, password);

            if (doctor == null)
            {
                return BadRequest("Invalid Email or Password");
            }

            return Ok(doctor);
        }

    }
}
