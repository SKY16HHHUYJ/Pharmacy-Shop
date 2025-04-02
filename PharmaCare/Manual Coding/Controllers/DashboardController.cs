using Microsoft.AspNetCore.Mvc;
using MyWebApp.Data;  // Make sure this is present
using MyWebApp.Models;  // accessing models

namespace Manual_Coding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("overview")]
        public IActionResult GetDashboardOverview()
        {
            var totalUsers = _context.Users.Count(); // Ensure _context.Users is of a type that supports Count()

            var activeSessions = 5; // Example data, replace with your logic

            var dashboardData = new
            {
                TotalUsers = totalUsers,
                ActiveSessions = activeSessions
            };

            return Ok(dashboardData);
        }
    }

    public class ApplicationDbContext
    {
        public List<User> Users { get; set; } // Ensure Users is a collection type that supports Count()
    }

    public class User
    {
        // User properties
    }
}
