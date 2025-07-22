using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MoviesBackend.Model
{
    [Table("Movies")]
    public class MovieModel
    {
        [Key]
        public int MovieId { get; set; }
        public string ?MovieTitle { get; set; }
        public string ?MovieGenre { get; set; }
        public string ? MovieImage {  get; set; }
        public int MovieYear { get; set; }
    }
}
