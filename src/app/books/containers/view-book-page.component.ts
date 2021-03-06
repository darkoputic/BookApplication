import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ViewBookPageActions } from '../actions';

@Component({
  selector: 'app-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-selected-book-page></app-selected-book-page> `,
})
export class ViewBookPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map((params) => ViewBookPageActions.selectBook({id: params.id})))
      .subscribe((action) => store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
