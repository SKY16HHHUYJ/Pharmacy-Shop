using System.ComponentModel.DataAnnotations;

namespace MyWebApp.Models
{
    public class UserInfo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public string? Address { get; set; }
    }
}
