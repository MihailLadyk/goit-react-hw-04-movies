import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "5f1d3356a034d160b3fe113dc6bcc6cc"; // <--- Ваш api ключ сюди

export function fetchTrendingMovies() {
  return axios.get(`${baseUrl}/trending/movie/day?api_key=${apiKey}`);
}

export function fetchMoviesByQuery(query) {
  return axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
}

export function fetchMovieDetails(movieId) {
  return axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
}

export function fetchMovieActors(movieId) {
  return axios.get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
}

export function fetchMovieReviews(movieId) {
  return axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`);
}
