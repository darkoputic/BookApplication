import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromSearch from './../reducers/search.reducer';
import * as fromBooks from './../reducers/books.reducer';
import * as fromCollection from './../reducers/collection.reducer';
import * as fromRoot from './../../reducers';
import { Book } from '../models';

export const booksFeatureKey = 'books';

export interface BooksState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromBooks.booksFeatureKey]: fromBooks.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export interface State extends fromRoot.State {
  [booksFeatureKey]: BooksState;
}

export function reducers(state: BooksState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromBooks.booksFeatureKey]: fromBooks.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

export const selectBooksState = createFeatureSelector<BooksState>(
  booksFeatureKey
);

export const selectBookEntitiesState = createSelector(
  selectBooksState,
  (state) => state.books
);

export const selectSelectedBookId = createSelector(
  selectBookEntitiesState,
  fromBooks.selectId
);

export const {
  selectIds: selectBookIds,
  selectEntities: selectBookEntities,
  selectAll: selectAllBooks,
  selectTotal: selectTotalBooks,
} = fromBooks.adapter.getSelectors(selectBookEntitiesState);

export const selectSelectedBook = createSelector(
  selectBookEntities,
  selectSelectedBookId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectSearchState = createSelector(
  selectBooksState,
  (state) => state.search
);

export const selectSearchBookIds = createSelector(
  selectSearchState,
  fromSearch.getIds
);
export const selectSearchQuery = createSelector(
  selectSearchState,
  fromSearch.getQuery
);
export const selectSearchLoading = createSelector(
  selectSearchState,
  fromSearch.getLoading
);
export const selectSearchError = createSelector(
  selectSearchState,
  fromSearch.getError
);

export const selectSearchResults = createSelector(
  selectBookEntities,
  selectSearchBookIds,
  (books, searchIds) => {
    return searchIds
      .map((id) => books[id])
      .filter((book): book is Book => book != null);
  }
);

export const selectCollectionState = createSelector(
  selectBooksState,
  (state) => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionBookIds = createSelector(
  selectCollectionState,
  fromCollection.getIds
);

export const selectBookCollection = createSelector(
  selectBookEntities,
  selectCollectionBookIds,
  (entities, ids) => {
    return ids
      .map((id) => entities[id])
      .filter((book): book is Book => book != null);
  }
);

export const isSelectedBookInCollection = createSelector(
  selectCollectionBookIds,
  selectSelectedBookId,
  (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }
);
