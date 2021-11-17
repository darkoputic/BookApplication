import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  AppComponent,
  NotFoundPageComponent
} from './containers';

import {
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent
} from './components';
import { MaterialModule } from '../material';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
}
