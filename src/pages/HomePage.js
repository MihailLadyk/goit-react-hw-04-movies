import { Component } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../services/movieApi";

export default class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetchTrendingMovies()
      .then((res) => this.setState({ movies: res.data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading, error } = this.state;
    return (
      <div>
        <h1>Trending today</h1>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error, {error.message}</h2>}
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
