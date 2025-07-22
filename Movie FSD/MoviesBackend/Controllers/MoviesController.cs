using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesBackend.Model;
using MoviesBackend.Repo;

namespace MoviesBackend.Controllers
{
    [Route("api/movie")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepo _movieRepo;
        public MoviesController(IMovieRepo movieRepo)
        {
            _movieRepo = movieRepo;
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<MovieModel> GetMovies()
        {
            try
            {
                var result = _movieRepo.GetAll();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("PostMovie")]
        public IActionResult PostMovie([FromBody] MovieModel MovieModel)
        {
            if (_movieRepo.Add(MovieModel))
            {
                return Ok("Movie added");
            }
            return Ok("Movie already exists");
        }

        [HttpGet]
        [Route("GetByYear")]
        public IActionResult GetByYear(int year)
        {

            try
            {
                var movie = _movieRepo.GetbyYear(year);

                if (movie.Count == 0)
                {
                    return Content("In this year no movie is present in the Database");
                }

                return Ok(movie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpPut]
        [Route("UpdateMovie")]
        public IActionResult Update(MovieModel moviename)
        {

            if (_movieRepo.UpdateMovie(moviename) == true)
            {
                return Ok("Movie has been updated");
            }
            else
            {
                return Ok("Movie is not in the Database");
            }
        }
        [HttpDelete]
        [Route("DeleteMovie")]
        public IActionResult Delete(string moviename)
        {

            if (_movieRepo.DeleteMovie(moviename) == true)
            {

                return Ok("Movie has been deleted");
            }
            else
            {
                return Ok("Movie is not in the Database");
            }
        }

    }
}
