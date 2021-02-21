import { Component } from "react";
import { fetchMovieActors } from "../services/movieApi";

export default class Cast extends Component {
  state = {
    moviesActors: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });

    fetchMovieActors(this.props.movDetail.id)
      .then((res) => this.setState({ moviesActors: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.moviesActors !== null && (
          <ul>
            {/* {console.log(this.state.moviesActors.cast)} */}
            {this.state.moviesActors.cast.map((actor) => (
              <li key={actor.id}>
                <img
                  src={
                    actor.profile_path != null
                      ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                      : "https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg"
                  }
                  width={140}
                  height={200}
                ></img>
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
