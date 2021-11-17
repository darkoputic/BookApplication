import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers';
import { MaterialModule } from '../material';
import { AuthEffects } from './effects';

import * as fromAuth from './../auth/reducers';

import {
  LoginFormComponent,
  LogoutConfirmationDialogComponent
} from './components';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature({
      name: fromAuth.authFeatureKey,
      reducer: fromAuth.reducers,
    }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {
}
