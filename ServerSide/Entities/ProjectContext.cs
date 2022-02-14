using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class ProjectContext : DbContext
    {
        public ProjectContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Data Source = localhost; Database = ApartmentManagement; integrated security = True;");
        }

        public DbSet<Users> users { get; set; }
        public DbSet<Apartments> apartments { get; set; }
        public DbSet<Bills> bills{ get; set; }
        public DbSet<Messages> messages { get; set; }
        public DbSet<APIAuthority> APIAuthority { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable("Users");
            modelBuilder.Entity<Apartments>().ToTable("Apartments");
            modelBuilder.Entity<Bills>().ToTable("Bills");
            modelBuilder.Entity<Messages>().ToTable("Messages");
            modelBuilder.Entity<APIAuthority>().ToTable("APIAuthority");
        }

        public List<APIAuthority> GetUsers()
        {
            List<APIAuthority> users = new List<APIAuthority>();
            users = APIAuthority.ToList();

            return users;
        }

        public List<Apartments> GetApartments()
        {
            List<Apartments> apartments = new List<Apartments>();
            apartments = apartments.ToList();

            return apartments;
        }

        public List<Bills> GetBills()
        {
            List<Bills> bills= new List<Bills>();
            bills = bills.ToList();

            return bills;
        }
        public List<Messages> GetMessages()
        {
            List<Messages> messages= new List<Messages>();
            messages = messages.ToList();

            return messages;
        }
    }
}
