using Microsoft.AspNetCore.Mvc;
using Models;
using Entities;
using MySqlX.XDevAPI.Common;
using Microsoft.AspNetCore.Authorization;

namespace Odev.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BillController : ControllerBase
    {

        ProjectContext dbOperations = new ProjectContext();

        [HttpGet]
        public List<Bills> GetAllBills()
        {
            List<Bills> resultList = dbOperations.bills.ToList();
            return resultList;
        }

        [HttpGet("{userID}")]
        public List<Bills> GetBill(int userID)
        {
            List<Bills> resultList = dbOperations.bills.Where(k => k.userID == userID).ToList();
            return resultList;
        }

        [HttpGet("payment/{billID}")]
        public Bills GetBillById(int billID)
        {
            Bills bill = dbOperations.bills.Where(k => k.billID == billID).FirstOrDefault();
            return bill;
        }

        [HttpPost]
        public string AddBill(Bills bill)
        {
            Bills bl = dbOperations.bills.Where(k => k.billID == bill.billID).FirstOrDefault();//Id si ile ekleme yapilirken eger id varsa hata vermesi icin

            if (bl == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                CommitAddingBill(bill);
                return "Bilgiler eklendi";
            }
                return "Eklenemedi";
        }

        [HttpPost("all")]
        public string AddBills(Bills bill)
        {
            List<Users> users = dbOperations.users.ToList();
            for(int i = 0; i < users.Count; i++)
            {
                bill.name = users[i].name;
                bill.surname = users[i].surname;
                bill.userID = users[i].userID;
                List<Apartments> apartments = dbOperations.apartments.ToList();
                for(int j = 0; j < apartments.Count; j++)
                {
                    if(users[i].userID == apartments[j].userID)
                    {
                        bill.block = apartments[j].block;
                        bill.number = apartments[j].number;
                        break;
                    }
                }
                CommitAddingBill(bill);
            }
          
            return "Bilgiler eklendi";
        }


        [HttpDelete("{id}")]
        public string DeleteBill(int id)
        {
            Bills bl = dbOperations.bills.Where(k => k.billID == id).FirstOrDefault();//silme yapilirken eger girilen id yoksa hata vermesi icin

            if (bl == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Girilen id bulunamadi.";
            }
            CommitDeletingBill(bl);
            return "Silme islemi basariyla gerceklestirildi.";

        }


        [HttpPut]
        public string UpdateBill(Bills bill)
        {
            Bills bl = dbOperations.bills.Where(k => k.billID == bill.billID).FirstOrDefault();//guncelleme yapilirken eger girilen id yoksa hata vermesi icin
            bill.name = bl.name;
            bill.surname = bl.surname;
            bill.number = bl.number;
            bill.block = bl.block;
            bill.fee = bl.fee;
            bill.userID = bl.userID;

            if (bl == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Hatali fatura giris.";
            }
            return CommitUpdatingBill(bill, bl);

        }

        private bool CommitAddingBill(Bills bill)
        {
            try
            {
                dbOperations.bills.Add(bill);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        private bool CommitDeletingBill(Bills bill)
        {
            try
            {
                dbOperations.bills.Remove(bill);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private string CommitUpdatingBill(Bills bill, Bills bl)
        {
            try
            {
                dbOperations.Entry(bl).CurrentValues.SetValues(bill);
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