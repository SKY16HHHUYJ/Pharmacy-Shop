using Microsoft.AspNetCore.Mvc;
using MyWebApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace MyWebApp.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("add")]
        public IActionResult AddUser([FromBody] UserInfo user)
        {
            if (user == null)
                return BadRequest("Invalid user data");

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(new { message = "User added successfully!" });
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<UserInfo>> Search(string query)
        {
            if (_context == null)
            {
                return StatusCode(500, "Database context is not initialized.");
            }

            var results = _context.Users.Where(u =>
                (u.FirstName != null && u.FirstName.ToLower().Contains(query.ToLower())) ||
                (u.LastName != null && u.LastName.ToLower().Contains(query.ToLower())) ||
                (u.Address != null && u.Address.ToLower().Contains(query.ToLower())) ||
                u.Age.ToString().Contains(query)).ToList();

            // Log the results for debugging
            Console.WriteLine($"Search query: {query}, Results: {results.Count}");

            return Ok(results);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserInfo updatedUser)
        {
            if (updatedUser == null || id != updatedUser.Id)
                return BadRequest("Invalid user data");

            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound("User not found");

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Age = updatedUser.Age;
            user.Address = updatedUser.Address;

            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok(new { message = "User updated successfully!" });
        }
    }
}