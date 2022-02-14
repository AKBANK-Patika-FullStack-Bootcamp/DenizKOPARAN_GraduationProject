using Microsoft.AspNetCore.Mvc;
using Models;
using Entities;
using MySqlX.XDevAPI.Common;
using Microsoft.AspNetCore.Authorization;

namespace Odev.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        ProjectContext dbOperations = new ProjectContext();

        /*[HttpGet()]
        public List<Brand> GetBrands()
        {
            List<Brand> resultList = dbOperations.Brand.ToList();//butun tabloyu donduruyor
            return resultList;
        }*/

        [HttpGet]
        public List<Users> GetAllUsers()
        {
            List<Users> resultList = dbOperations.users.ToList();
            return resultList;
        }

        [HttpGet("{userID}")]
        public Users GetUserByID(int userID)
        {
            Users us = dbOperations.users.Where(k => k.userID == userID).FirstOrDefault();
            return us;
        }

        [HttpGet("getname/{userID}")]
        public String GetnameByID(int userID)
        {
            Users us = dbOperations.users.Where(k => k.userID == userID).FirstOrDefault();
            return us.name + " " + us.surname;
        }

        [HttpGet("{email}/{password}")]
        public Users GetUserPass(string email, string password)
        {
            Users us = dbOperations.users.Where(k => k.email == email && k.password == password).FirstOrDefault();
            return us;
        }


        [HttpPost]
        public string AddUserInformation(Users user)
        {
            Users us = dbOperations.users.Where(k => k.email == user.email).FirstOrDefault();//Id si ile ekleme yapilirken eger id varsa hata vermesi icin

            if (us == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                CommitAddingUser(user);
                return "Bilgiler eklendi";
            }
                return "Bu mail adresi zaten mevcut";
        }


        [HttpDelete("{id}")]
        public string DeleteUserInformation(int id)
        {
            Users us = dbOperations.users.Where(k => k.userID == id).FirstOrDefault();//silme yapilirken eger girilen id yoksa hata vermesi icin

            if (us == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Girilen id bulunamadi.";
            }
            CommitDeletingUser(us);
            return "Silme islemi basariyla gerceklestirildi.";

        }


        [HttpPut]
        public string UpdateUser(Users user)
        {
            Users us = dbOperations.users.Where(k => k.userID == user.userID).FirstOrDefault();//guncelleme yapilirken eger girilen id yoksa hata vermesi icin
            user.isAdmin = us.isAdmin;
            if (us == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Girilen kullanici bulunamadi.";
            }
            return CommitUpdatingUser(user, us);

        }

        private bool CommitAddingUser(Users user)
        {
            try
            {
                dbOperations.users.Add(user);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        private bool CommitDeletingUser(Users user)
        {
            try
            {
                dbOperations.users.Remove(user);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private string CommitUpdatingUser(Users user, Users us)
        {
            try
            {
                dbOperations.Entry(us).CurrentValues.SetValues(user);
                dbOperations.SaveChanges();
                return "Guncelleme islemi tamamlandi.";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public void CreateLogin(APIAuthority loginUser)
        {
            dbOperations.APIAuthority.Add(loginUser);
            dbOperations.SaveChanges();
        }

        public APIAuthority GetLogin(APIAuthority loginUser)
        {
            APIAuthority? user = new APIAuthority();
            if (!string.IsNullOrEmpty(loginUser.username) && !string.IsNullOrEmpty(loginUser.password) )
            {
                user = dbOperations.APIAuthority.FirstOrDefault(m => m.username == loginUser.username && m.password == loginUser.password);
            }

            return user;
        }



    }
}