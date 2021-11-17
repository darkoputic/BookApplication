import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { metaReducers, ROOT_REDUCERS } from './reducers';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers';
import { RouterEffects, UserEffects } from './core/effects';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App',
    }),
    EffectsModule.forRoot([UserEffects, RouterEffects]),
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
