import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { LayoutActions } from '../actions';
import { AuthActions } from '../../auth/actions';

import * as fromAuth from './../../auth/reducers';
import * as fromRoot from './../../reducers';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <app-sidenav [open]="showSidenav$ | async" (closeMenu)="closeSidenav()">
        <app-nav-item
          (navigate)="closeSidenav()" *ngIf="loggedIn$ | async"
          routerLink="/"
          icon="book"
          hint="View your book collection">
          My Collection
        </app-nav-item>
        <app-nav-item
          (navigate)="closeSidenav()" *ngIf="loggedIn$ | async"
          routerLink="/books/find"
          icon="search"
          hint="Find your next book!">
          Browse Books
        </app-nav-item>
        <app-nav-item (navigate)="closeSidenav()" *ngIf="(loggedIn$ | async) === false">Sign In</app-nav-item>
        <app-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">Sign Out</app-nav-item>
      </app-sidenav>
      <app-toolbar (openMenu)="openSidenav()">Book Collection</app-toolbar>

      <router-outlet></router-outlet>
    </app-layout>
  `
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store) {
    this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.selectLoggedIn);
  }

  closeSidenav(): void {
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav(): void {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
