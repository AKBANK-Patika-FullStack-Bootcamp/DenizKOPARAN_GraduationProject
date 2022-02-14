using Microsoft.AspNetCore.Mvc;
using Models;
using Entities;
using MySqlX.XDevAPI.Common;
using Microsoft.AspNetCore.Authorization;

namespace Odev.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApartmentController : ControllerBase
    {

        ProjectContext dbOperations = new ProjectContext();


        [HttpGet]
        public List<Apartments> GetAllApartments()
        {
            List<Apartments> resultList = dbOperations.apartments.ToList();
            return resultList;
        }

        [HttpGet("get/{apartmentid}")]
        public Apartments GetApartment(int apartmentid)
        {
            Apartments res = dbOperations.apartments.Where(k => k.apartmentID == apartmentid).FirstOrDefault();
            return res;
        }

        [HttpGet("{block}/{number}")]
        public int GetApartmentByNumber(string block, int number)
        {
            int result = dbOperations.apartments.Where(k => k.block == block && k.number == number).Select(x => x.userID).FirstOrDefault();
            return result;
        }

        [HttpPost]
        public string AddApartmentInformation(Apartments apartment)
        {
            Apartments ap = dbOperations.apartments.Where(k => k.apartmentID == apartment.apartmentID).FirstOrDefault();//Id si ile ekleme yapilirken eger id varsa hata vermesi icin

            if (ap == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                CommitAddingApartment(apartment);
                return "Bilgiler eklendi";
            }
                return "Eklenemedi";
        }


        [HttpDelete("{id}")]
        public string DeleteApartmentInformation(int id)
        {
            Apartments ap = dbOperations.apartments.Where(k => k.apartmentID == id).FirstOrDefault();//silme yapilirken eger girilen id yoksa hata vermesi icin

            if (ap == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Girilen id bulunamadi.";
            }
            CommitDeletingApartment(ap);
            return "Silme islemi basariyla gerceklestirildi.";

        }


        [HttpPut]
        public string UpdateApartment(Apartments apartment)
        {
            Apartments ap = dbOperations.apartments.Where(k => k.apartmentID == apartment.apartmentID).FirstOrDefault();//guncelleme yapilirken eger girilen id yoksa hata vermesi icin

            if (ap == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Girilen apartman bulunamadi.";
            }
            return CommitUpdatingApartment(apartment, ap);

        }

        private bool CommitAddingApartment(Apartments apartment)
        {
            try
            {
                dbOperations.apartments.Add(apartment);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        private bool CommitDeletingApartment(Apartments apartment)
        {
            try
            {
                dbOperations.apartments.Remove(apartment);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private string CommitUpdatingApartment(Apartments apartment, Apartments ap)
        {
            try
            {
                dbOperations.Entry(ap).CurrentValues.SetValues(apartment);
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
            if (!string.IsNullOrEmpty(loginUser.username) && !string.IsNullOrEmpty(loginUser.password))
            {
                user = dbOperations.APIAuthority.FirstOrDefault(m => m.username == loginUser.username && m.password == loginUser.password);
            }

            return user;
        }

    }
}