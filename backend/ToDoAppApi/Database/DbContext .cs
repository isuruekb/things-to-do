using ToDoAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ToDoAppApi.Database
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<TodoTask> TodoTask { get; set; }

    }
}
