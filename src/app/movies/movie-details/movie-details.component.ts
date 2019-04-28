import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent {

  @Input()
  movie: Movie;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private movieService: MovieService) { }

  createMovie(movie: Movie) {
    this.movieService.createMovie(movie).then((newMovie: Movie) => {
      this.createHandler(newMovie);
    });
  }

  updateMovie(movie: Movie): void {
    this.movieService.updateMovie(movie).then((updatedMovie: Movie) => {
      this.updateHandler(updatedMovie);
    });
  }

  deleteMovie(movieId: String): void {
    this.movieService.deleteMovie(movieId).then((deletedMovieId: String) => {
      this.deleteHandler(deletedMovieId);
    });
  }


}
