import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container fullscreen>
      <ng-content></ng-content>
    </mat-sidenav-container>
  `,
  styles: [
      `
      mat-sidenav-container {
        background: rgba(0, 0, 0, 0.03);
      }

      *, * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
  ],
})
export class LayoutComponent {
}
