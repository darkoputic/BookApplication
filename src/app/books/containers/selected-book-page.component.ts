import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBooks from '../../books/reducers';
import { Book } from '../models';
import { SelectedBookPageActions } from '../actions';

@Component({
  selector: 'app-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
    >
    </app-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store) {
    this.book$ = store.select(fromBooks.selectSelectedBook) as Observable<Book>;
    this.isSelectedBookInCollection$ = store.select(
      fromBooks.isSelectedBookInCollection
    );
  }

  addToCollection(book: Book) {
    this.store.dispatch(SelectedBookPageActions.addBook({ book }));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(SelectedBookPageActions.removeBook({ book }));
  }
}
