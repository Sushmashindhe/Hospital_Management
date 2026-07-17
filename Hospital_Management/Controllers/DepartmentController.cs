using Hospital_Management.Models;
using Hospital_Management.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentService _departmentService;

        public DepartmentController(DepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        // GET: api/Department
        [HttpGet]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _departmentService.GetAllDepartments();
            return Ok(departments);
        }

        // GET: api/Department/1
        //[HttpGet("{departmentId}")]
        //public async Task<IActionResult> GetDepartmentById(int departmentId)
        //{
        //    var department = await _departmentService.GetDepartmentById(departmentId);

        //    if (department == null)
        //    {
        //        return NotFound("Department not found.");
        //    }

        //    return Ok(department);
        //}

        // POST: api/Department
        [HttpPost]
        public async Task<IActionResult> AddDepartment([FromBody] Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _departmentService.AddDepartment(department);

            return Ok(result);
        }

        // PUT: api/Department/1
        [HttpPut("{departmentId}")]
        public async Task<IActionResult> UpdateDepartment(int departmentId, [FromBody] Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _departmentService.UpdateDepartment(departmentId, department);

            if (result == "Department not found.")
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        // DELETE: api/Department/1
        [HttpDelete("{departmentId}")]
        public async Task<IActionResult> DeleteDepartment(int departmentId)
        {
            var result = await _departmentService.DeleteDepartment(departmentId);

            if (result == "Department not found.")
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}