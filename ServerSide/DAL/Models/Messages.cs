using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Messages
    {
        [Key]
        public int messageID { get; set; } = 0;
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;
        public string title { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public bool viewed { get; set; } = false;
        public int userID { get; set; } = 0;
    }
}
