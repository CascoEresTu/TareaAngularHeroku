import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})

export class MovieListComponent implements OnInit {

  movies: Movie[]
  selectedMovie: Movie

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService
      .getMovies()
      .then((movies: Movie[]) => {
        this.movies = movies.map((Movie) => {
          return Movie;
        });
      });
  }

  private getIndexOfMovie = (movieId: String) => {
    return this.movies.findIndex((movie) => {
      return movie._id === movieId;
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie
  }

  createNewMovie() {
    var movie: Movie = {
      name: '',
      year: '',
      rating: 0,
    };
    // By default, a newly-created Movie will have the selected state.
    this.selectMovie(movie);
  }

  deleteMovie = (movieId: String) => {
    var idx = this.getIndexOfMovie(movieId);
    if (idx !== -1) {
      this.movies.splice(idx, 1);
      this.selectMovie(null);
    }
    return this.movies;
  }

  addMovie = (movie: Movie) => {
    this.movies.push(movie);
    this.selectMovie(movie);
    return this.movies;
  }

  updateMovie = (movie: Movie) => {
    var idx = this.getIndexOfMovie(movie._id);
    if (idx !== -1) {
      this.movies[idx] = movie;
      this.selectMovie(movie);
    }
    return this.movies;
  }
}