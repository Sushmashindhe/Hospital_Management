using Hospital_Management.Models;
using Hospital_Management.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _appointmentService;

        public AppointmentController(AppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppointments()
        {
            return Ok(await _appointmentService.GetAllAppointments());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointmentById(int id)
        {
            var appointment = await _appointmentService.GetAppointmentById(id);

            if (appointment == null)
                return NotFound();

            return Ok(appointment);
        }

        [HttpPost]
        public async Task<IActionResult> BookAppointment([FromBody] Appointment appointment)
        {
            var result = await _appointmentService.BookAppointment(appointment);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, Appointment appointment)
        {
            var result = await _appointmentService.UpdateAppointment(id, appointment);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var result = await _appointmentService.DeleteAppointment(id);

            return Ok(result);
        }
        [HttpPut("Feedback/{id}")]
        public async Task<IActionResult> AddFeedback(int id, [FromBody] Appointment appointment)
        {
            var result = await _appointmentService.AddFeedback(id, appointment.FeedBack);

            return Ok(result);
        }

        [HttpGet("Patient/{patientId}")]
        public async Task<IActionResult> GetPatientAppointments(int patientId)
        {
            var appointments = await _appointmentService.GetPatientAppointments(patientId);

            return Ok(appointments);
        }
        [HttpGet("Doctor/{doctorId}")]
        public async Task<IActionResult> GetDoctorAppointments(int doctorId)
        {
            var appointments = await _appointmentService.GetDoctorAppointments(doctorId);

            return Ok(appointments);
        }

        [HttpPut("Cancel/{id}")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var result = await _appointmentService.CancelAppointment(id);

            if (result == "Appointment Not Found")
                return NotFound(result);

            if (result.Contains("cannot"))
                return BadRequest(result);

            return Ok(result);
        }
    }
}