using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Bills
    {
        [Key]
        public int billID { get; set; } = 0;
        public string block { get; set; } = string.Empty;
        public int number { get; set; } = 0;
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;
        public int fee { get; set; } = 0;
        public bool paid { get; set; } = false;
        public int userID { get; set; } = 0;

    }
}
