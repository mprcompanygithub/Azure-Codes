import React, { useEffect, useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByYear,
} from "./Middleware/api";
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    movieId: 0,
    movieTitle: "",
    movieGenre: "",
    movieYear: "",
    movieImage: "",
  });
  const [yearSearch, setYearSearch] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.movieId === 0) {
      await createMovie(form);
    } else {
      await updateMovie(form);
    }
    setForm({
      movieId: 0,
      movieTitle: "",
      movieGenre: "",
      movieYear: "",
      movieImage: "",
    });
    loadMovies();
  };

  const handleEdit = (movie) => {
    setForm(movie);
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  const handleSearchByYear = async () => {
    if (!yearSearch) return;
    const data = await getMoviesByYear(yearSearch);
    setMovies(data);
  };

  const handleClearSearch = () => {
    setYearSearch("");
    loadMovies();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎬 Movies CRUD</h2>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={form.movieTitle}
              onChange={(e) => setForm({ ...form, movieTitle: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Genre"
              className="form-control"
              value={form.movieGenre}
              onChange={(e) => setForm({ ...form, movieGenre: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Year"
              className="form-control"
              value={form.movieYear}
              onChange={(e) => setForm({ ...form, movieYear: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Image URL"
              className="form-control"
              value={form.movieImage}
              onChange={(e) => setForm({ ...form, movieImage: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" type="submit">
            {form.movieId === 0 ? "Add Movie" : "Update Movie"}
          </button>
        </div>
      </form>

      <div className="d-flex mb-3">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Search by Year"
          value={yearSearch}
          onChange={(e) => setYearSearch(e.target.value)}
        />
        <button className="btn btn-info me-2" onClick={handleSearchByYear}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={handleClearSearch}>
          Clear
        </button>
      </div>

      <table className="table table-striped table-bordered shadow-sm text-center">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Image</th>
            <th className="text-center">Title</th>
            <th className="text-center">Genre</th>
            <th className="text-center">Year</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No movies found
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie.movieId}>
                <td className="text-center">
                  {movie.movieImage ? (
                    <img
                      src={movie.movieImage}
                      alt={movie.movieTitle}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="text-center">{movie.movieTitle}</td>
                <td className="text-center">{movie.movieGenre}</td>
                <td className="text-center">{movie.movieYear}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie.movieTitle)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
