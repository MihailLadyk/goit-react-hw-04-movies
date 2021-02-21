import { Component } from "react";
import queryString from "query-string";
import Searchbar from "../Components/Searchbar";
import { fetchMoviesByQuery } from "../services/movieApi";

import { Link } from "react-router-dom";

export default class MoviesPage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    const { querry } = queryString.parse(this.props.location.search);
    if (querry) {
      this.setState({ loading: true });
      fetchMoviesByQuery(querry)
        .then((res) => this.setState({ movies: res.data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.location.search;
    const newSearch = this.props.location.search;

    if (prevSearch !== newSearch) {
      const { querry } = queryString.parse(newSearch);
      console.log(querry);
      this.setState({ loading: true });
      fetchMoviesByQuery(querry)
        .then((res) => this.setState({ movies: res.data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSearch = (querry) => {
    this.props.history.push({
      ...this.props.location,
      search: `?querry=${querry}`,
    });
  };
  render() {
    const { movies, loading, error } = this.state;
    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
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
