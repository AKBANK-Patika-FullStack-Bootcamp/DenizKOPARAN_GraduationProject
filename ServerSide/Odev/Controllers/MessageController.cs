using Microsoft.AspNetCore.Mvc;
using Models;
using Entities;
using MySqlX.XDevAPI.Common;
using Microsoft.AspNetCore.Authorization;

namespace Odev.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {

        ProjectContext dbOperations = new ProjectContext();

        [HttpGet]
        public List<Messages> GetAllMessages()
        {
            List<Messages> resultList = dbOperations.messages.ToList();
            return resultList;
        }

        [HttpGet("{userid}")]
        public List<Messages> GetMessage(int userid)
        {
            List<Messages> resultList = dbOperations.messages.Where(k => k.userID == userid).ToList();
            return resultList;
        }

        [HttpGet("get/{messageid}")]
        public Messages GetMessageID(int messageid)
        {
            Messages message = dbOperations.messages.Where(k => k.messageID == messageid).FirstOrDefault();
            return message;
        }

        [HttpPost]
        public string AddMessage(Messages message)
        {
            Messages ms = dbOperations.messages.Where(k => k.messageID == message.messageID).FirstOrDefault();//Id si ile ekleme yapilirken eger id varsa hata vermesi icin

            if (ms == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                CommitAddingMessage(message);
                return "Bilgiler eklendi";
            }
                return "Eklenemedi";
        }


        [HttpDelete("{id}")]
        public string DeleteMessage(int id)
        {
            Messages ms = dbOperations.messages.Where(k => k.messageID == id).FirstOrDefault();//silme yapilirken eger girilen id yoksa hata vermesi icin

            if (ms == null)//Eger bos donuyorsa o id daha onceden kaydedilmedi demektir.
            {
                return "Girilen id bulunamadi.";
            }
            CommitDeletingMessage(ms);
            return "Silme islemi basariyla gerceklestirildi.";

        }


        [HttpPut]
        public string UpdateMessage(Messages message)
        {
            Messages ms = dbOperations.messages.Where(k => k.messageID == message.messageID).FirstOrDefault();//guncelleme yapilirken eger girilen id yoksa hata vermesi icin
            message.description = ms.description;
            message.userID = ms.userID;
            message.title = ms.title;
            message.name = ms.name;
            message.surname = ms.surname;
            return CommitUpdatingMessage(message, ms);

        }

        private bool CommitAddingMessage(Messages message)
        {
            try
            {
                dbOperations.messages.Add(message);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        private bool CommitDeletingMessage(Messages message)
        {
            try
            {
                dbOperations.messages.Remove(message);
                dbOperations.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private string CommitUpdatingMessage(Messages message, Messages ms)
        {
            try
            {
                dbOperations.Entry(ms).CurrentValues.SetValues(message);
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