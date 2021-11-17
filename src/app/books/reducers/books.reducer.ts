import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../models';
import { createReducer, on } from '@ngrx/store';
import { BookActions, BooksApiActions, CollectionApiActions, ViewBookPageActions } from '../actions';

export const booksFeatureKey = 'books';

export interface State extends EntityState<Book> {
  selectedBookId: string | null;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedBookId: null
});

export const reducer = createReducer(
  initialState,
  on(
    BooksApiActions.searchSuccess,
    CollectionApiActions.loadBooksSuccess,
    (state, {books}) => adapter.addMany(books, state)
  ),
  on(
    BookActions.loadBook,
    (state, {book}) => adapter.addOne(book, state)
  ),
  on(
    ViewBookPageActions.selectBook,
    (state, {id}) => ({
      ...state,
      selectedBookId: id
    })
  )
);

export const selectId = (state: State) => state.selectedBookId;
