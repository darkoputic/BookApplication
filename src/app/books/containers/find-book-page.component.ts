import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Book } from '../models';
import { Store } from '@ngrx/store';
import { FindBookPageActions } from '../actions';

import * as fromBooks from '../../books/reducers';

@Component({
  selector: 'app-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-book-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)"
    >
    </app-book-search>
    <app-book-preview-list [books]="books$ | async"></app-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store) {
    this.searchQuery$ = store.select(fromBooks.selectSearchQuery).pipe(take(1));
    this.books$ = store.select(fromBooks.selectSearchResults);
    this.loading$ = store.select(fromBooks.selectSearchLoading);
    this.error$ = store.select(fromBooks.selectSearchError);
  }

  search(query: string) {
    this.store.dispatch(FindBookPageActions.searchBooks({query}));
  }
}
