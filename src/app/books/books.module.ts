import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromBooks from '../books/reducers';
import {
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent
} from './components';

import { CollectionPageComponent, FindBookPageComponent, SelectedBookPageComponent, ViewBookPageComponent } from './containers';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material';
import { PipesModule } from '../shared/pipes';

import { BookEffects, CollectionEffects } from './effects';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
];

export const CONTAINERS = [
  FindBookPageComponent,
  ViewBookPageComponent,
  SelectedBookPageComponent,
  CollectionPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BooksRoutingModule,
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducers),
    EffectsModule.forFeature([BookEffects, CollectionEffects]),
    PipesModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
  exports: [COMPONENTS, CONTAINERS],
})
export class BooksModule {}
