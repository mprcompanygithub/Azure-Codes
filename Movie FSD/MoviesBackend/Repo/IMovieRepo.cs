using MoviesBackend.Model;

namespace MoviesBackend.Repo
{
    public interface IMovieRepo
    {
        IEnumerable<MovieModel> GetAll();
        bool Add(MovieModel movie);
        List<MovieModel> GetbyYear(int year);
        bool UpdateMovie(MovieModel moviename);
        bool DeleteMovie(string moviename);
        }
}
