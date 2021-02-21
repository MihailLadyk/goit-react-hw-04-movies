import { Component } from "react";
import { fetchMovieReviews } from "../services/movieApi";

export default class Reviews extends Component {
  state = {
    movieReviews: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: false });

    fetchMovieReviews(this.props.movDetail.id)
      .then((res) => this.setState({ movieReviews: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.movieReviews !== null && (
          <div>
            {this.state.movieReviews.results.length > 0 ? (
              <div>
                {this.state.movieReviews.results.map((review) => (
                  <li key={review.id}>
                    {<h2>Author:{review.author}</h2>}
                    <p>{review.content}</p>
                  </li>
                ))}
              </div>
            ) : (
              <h2>There is no reviews</h2>
            )}
          </div>
        )}
      </div>
    );
  }
}
