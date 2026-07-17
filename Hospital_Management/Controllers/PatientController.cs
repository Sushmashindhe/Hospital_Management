using Hospital_Management.Models;
using Hospital_Management.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Hospital_Management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly PatientService _patientService;

        public PatientController(PatientService patientService)
        {
            _patientService = patientService;
        }

        // Register

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Patient patient)
        {
            var result = await _patientService.RegisterPatient(patient);

            return Ok(result);
        }

        // Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromQuery] string email, [FromQuery] string password)
        {
            var patient = await _patientService.LoginPatient(email, password);

            if (patient == null)
            {
                return BadRequest("Invalid Email or Password");
            }

            return Ok(patient);
        }

        // Get All Patients

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _patientService.GetAllPatients();

            return Ok(patients);
        }

        // Get Patient By Id

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            var patient = await _patientService.GetPatientById(id);

            if (patient == null)
            {
                return NotFound("Patient not found");
            }

            return Ok(patient);
        }
    }
}