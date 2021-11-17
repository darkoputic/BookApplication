import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './core/containers';
import { AuthGuard } from './auth/services';

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then((m) => m.BooksModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {title: 'Not found'},
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
