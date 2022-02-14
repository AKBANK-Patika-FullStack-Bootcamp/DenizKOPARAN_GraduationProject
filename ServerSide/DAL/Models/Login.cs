using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Login
    {
        public string username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }

    public class loginDTO
    {
        [FromHeader]
        public string username { get; set; } = string.Empty;
        [FromHeader]
        public string password { get; set; } = string.Empty;
    }

    public class APIAuthority
    {
        public int ID { get; set; }
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public bool admin { get; set; } = false;

    }

}
