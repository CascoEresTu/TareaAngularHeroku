import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Http, Response } from '@angular/http';

@Injectable()
export class MovieService {

  private moviesUrl = '/api/movies';

  constructor(private http: Http) { }

  getMovies(): Promise<void | Movie[]> {
    return this.http.get(this.moviesUrl)
      .toPromise()
      .then(response => response.json() as Movie[])
      .catch(this.handleError);
  }

  // post("/api/Movies")
  createMovie(newMovie: Movie): Promise<void | Movie> {
    return this.http.post(this.moviesUrl, newMovie)
      .toPromise()
      .then(response => response.json() as Movie)
      .catch(this.handleError);
  }

  // get("/api/Movies/:id") endpoint not used by Angular app

  // delete("/api/Movies/:id")
  deleteMovie(delMovieId: String): Promise<void | String> {
    return this.http.delete(this.moviesUrl + '/' + delMovieId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/Movies/:id")
  updateMovie(putMovie: Movie): Promise<void | Movie> {
    var putUrl = this.moviesUrl + '/' + putMovie._id;
    return this.http.put(putUrl, putMovie)
      .toPromise()
      .then(response => response.json() as Movie)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
