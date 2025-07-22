using Microsoft.EntityFrameworkCore;
using MoviesBackend.Model;

namespace MoviesBackend.Repo
{
    public class MovieRepo : IMovieRepo
    {
        private MovieDbContext _context;
        public MovieRepo(MovieDbContext db)
        {
            _context = db;
        }
        public IEnumerable<MovieModel> GetAll()
        {
            try
            {
                return _context.Movies.ToList();
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<MovieModel>();
            }
        }

        public bool Add(MovieModel movie)
        {

            var existingMovie = _context.Movies.FirstOrDefault(m => m.MovieTitle.ToLower() == movie.MovieTitle.ToLower());

            if (existingMovie == null)
            {
                _context.Movies.Add(movie);
                _context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }
        public List<MovieModel> GetbyYear(int year)
        {

            try
            {
                return _context.Movies.Where(m => m.MovieYear == year).ToList();
            }
            catch (Exception ex)
            {
                return new List<MovieModel>();
            }

        }

        public bool UpdateMovie(MovieModel moviename)
        {

            var existingMovie = _context.Movies.Find(moviename.MovieId);

            if (existingMovie != null)
            {
                existingMovie.MovieTitle = moviename.MovieTitle;
                existingMovie.MovieGenre = moviename.MovieGenre;
                existingMovie.MovieYear = moviename.MovieYear;
                existingMovie.MovieImage = moviename.MovieImage;
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteMovie(string moviename)
        {

            try
            {
                var movie = _context.Movies
      .FirstOrDefault(m => m.MovieTitle.ToLower() == moviename.ToLower());
                if (movie == null) { return false; }
                _context.Movies.Remove(movie);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
    }
}
