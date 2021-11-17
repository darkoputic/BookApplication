import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { CollectionApiActions, CollectionPageActions, SelectedBookPageActions } from '../actions';
import { Book } from '../models';
import { BookStorageService } from '../../core/services/book-storage.service';

@Injectable()
export class CollectionEffects {
  checkStorageSupport$ = createEffect(
    () => defer(() => this.storageService.supported()),
    {dispatch: false}
  );

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionPageActions.enter),
      switchMap(() =>
        this.storageService.getCollection().pipe(
          map((books: Book[]) =>
            CollectionApiActions.loadBooksSuccess({books})
          ),
          catchError((error) =>
            of(CollectionApiActions.loadBooksFailure({error}))
          )
        )
      )
    )
  );

  addBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedBookPageActions.addBook),
      mergeMap(({book}) =>
        this.storageService.addToCollection([book]).pipe(
          map(() => CollectionApiActions.addBookSuccess({book})),
          catchError(() => of(CollectionApiActions.addBookFailure({book})))
        )
      )
    )
  );

  removeBookFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedBookPageActions.removeBook),
      mergeMap(({book}) =>
        this.storageService.removeFromCollection([book.id]).pipe(
          map(() => CollectionApiActions.removeBookSuccess({book})),
          catchError(() => of(CollectionApiActions.removeBookFailure({book})))
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private storageService: BookStorageService) {
  }
}
