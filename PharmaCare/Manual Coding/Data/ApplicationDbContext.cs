namespace MyWebApp.Data  // Make sure this matches your project name
{
    using Manual_Coding.Controllers;
    using Microsoft.EntityFrameworkCore;
    using MyWebApp.Models;  // Ensure Models is in the correct namespace

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }  // Check if the User model is correctly referenced
    }
}
