using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Odev.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController
    {
        public static Login login = new Login();
        private readonly IConfiguration _configuration;
        public MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
        ApartmentController dbOperations = new ApartmentController();

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("create")]
        public bool loginCreate(APIAuthority user)//creates new users with hashed password
        {
            user.password = MD5Hash(user.password);
            dbOperations.CreateLogin(user);
            return true;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromHeader]loginDTO request)//checks if the user exist
        {
            APIAuthority tokenUser = new APIAuthority();
            tokenUser.username = request.username;
            tokenUser.password = MD5Hash(request.password);
            APIAuthority result = dbOperations.GetLogin(tokenUser);
            if(result != null)
            {
                return (CreateToken(login));
            }
            return null;//if the user does not exist, then return null

        }

        private string CreateToken(Login login)//if user informations are true, creates a token for 1 day
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, login.username),
                new Claim(ClaimTypes.Role,"Admin")
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public string MD5Hash(string _input)//MD5 encryption method
        {
            byte[] dizi = Encoding.UTF8.GetBytes(_input);
            dizi = md5.ComputeHash(dizi);
            StringBuilder sb = new StringBuilder();
            foreach(byte b in dizi)
            {
                sb.Append(b.ToString("x2").ToLower());
            }
            return sb.ToString();
        }



    }
}
