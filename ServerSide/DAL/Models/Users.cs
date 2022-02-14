using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Users
    {
        [Key]
        public int userID { get; set; } = 0;
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;
        public string TCNum { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string phone { get; set; } = string.Empty;
        public string carPlate { get; set; } = string.Empty;
        public bool isAdmin { get; set; } = false;
        public string password { get; set; } = string.Empty;
    }
}
