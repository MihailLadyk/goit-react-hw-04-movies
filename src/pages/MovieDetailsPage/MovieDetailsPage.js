import { Link, Route } from "react-router-dom";
import { fetchMovieDetails } from "../../services/movieApi";
import { Component } from "react";
import Cast from "../Cast";
import Reviews from "../Reviews";

export default class MovieDetailsPage extends Component {
  state = {
    moviesDetails: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });

    fetchMovieDetails(this.props.match.params.movieId)
      .then((res) => this.setState({ moviesDetails: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  goBackFunc = () => {
    this.props.history.goBack();
  };

  render() {
    const { moviesDetails } = this.state;
    return (
      <div>
        {/* {console.log(this.state.moviesDetails)} */}
        {moviesDetails !== null && (
          <div>
            <button onClick={this.goBackFunc}>Go back</button>
            <br></br>
            <img
              width={640}
              alt="MovieImage"
              src={`https://image.tmdb.org/t/p/original${moviesDetails.backdrop_path}`}
            />
            <h2>
              {this.state.moviesDetails.title}(
              {this.state.moviesDetails.release_date})
            </h2>
            <p>user score:{this.state.moviesDetails.vote_average * 10}%</p>
            <h2>Overview</h2>
            <p>{this.state.moviesDetails.overview}</p>
            <h2>Genres</h2>
            {this.state.moviesDetails.genres.map((obj) => (
              <p key={obj.id}>{obj.name}</p>
            ))}

            <h2>Additional information</h2>

            <ul>
              <li>
                <Link
                  to={
                    this.props.location.pathname.includes("cast")
                      ? this.props.match.url
                      : this.props.match.url + "/cast"
                  }
                >
                  Cast
                </Link>
              </li>

              <li>
                <Link
                  to={
                    this.props.location.pathname.includes("reviews")
                      ? this.props.match.url
                      : this.props.match.url + "/reviews"
                  }
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Route
              path={this.props.match.url + "/reviews"}
              render={() => <Reviews movDetail={this.state.moviesDetails} />}
            />
            <Route
              path={this.props.match.url + "/cast"}
              render={() => <Cast movDetail={this.state.moviesDetails} />}
            />
            <div></div>
          </div>
        )}
      </div>
    );
  }
}
