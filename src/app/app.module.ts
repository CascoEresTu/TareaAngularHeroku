import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
