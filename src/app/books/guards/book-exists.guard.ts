import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { GoogleBooksService } from '../../core/services/google-books.service';

import { BookActions } from '../actions';
import * as fromBooks from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class BookExistsGuard implements CanActivate {
  constructor(
    private store: Store,
    private googleBooks: GoogleBooksService,
    private router: Router
  ) {
  }

  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.select(fromBooks.selectCollectionLoaded).pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  hasBookInStore(id: string): Observable<boolean> {
    return this.store.select(fromBooks.selectBookEntities).pipe(
      map((entities) => !!entities[id]),
      take(1)
    );
  }

  hasBookInApi(id: string): Observable<boolean> {
    return this.googleBooks.retrieveBook(id).pipe(
      map((bookEntity) => BookActions.loadBook({book: bookEntity})),
      tap((action) => this.store.dispatch(action)),
      map((book) => !!book),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  hasBook(id: string): Observable<boolean> {
    return this.hasBookInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasBookInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasBook(route.params['id']))
    );
  }
}
