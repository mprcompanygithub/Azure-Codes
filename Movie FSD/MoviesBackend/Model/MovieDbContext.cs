using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MoviesBackend.Model
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options)
  : base(options)
        {
        }

        public DbSet<MovieModel> Movies { get; set; }
    }
}
