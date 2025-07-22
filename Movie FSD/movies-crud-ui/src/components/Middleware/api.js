const BASE_URL = "https://localhost:44392/api/Movie"; // your .NET API

export const getMovies = () => fetch(BASE_URL).then((res) => res.json());

export const getMoviesByYear = (year) =>
  fetch(`${BASE_URL}/GetByYear?year=${year}`).then((res) => res.json());

export const createMovie = (movie) =>
  fetch(`${BASE_URL}/PostMovie`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });

export const updateMovie = (movie) =>
  fetch(`${BASE_URL}/UpdateMovie`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });

export const deleteMovie = (moviename) =>
  fetch(`${BASE_URL}/DeleteMovie?moviename=${moviename}`, {
    method: "DELETE",
  });
