import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {MovieDetailsComponent} from './movie-details.component'

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [
        MovieDetailsComponent,  
    ]
  })
  export class MovieDetailsModule {}