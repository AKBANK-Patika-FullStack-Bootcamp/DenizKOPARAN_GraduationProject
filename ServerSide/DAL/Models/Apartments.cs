using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Apartments
    {
        [Key]
        public int apartmentID { get; set; } = 0;
        public string block { get; set; } = string.Empty;
        public bool state { get; set; } = false;
        public string type { get; set; } = string.Empty;
        public int floor { get; set; } = 0;
        public int number { get; set; } = 0;
        public bool userType { get; set; } = false;
        public int userID { get; set; } = 0;
    }
}
