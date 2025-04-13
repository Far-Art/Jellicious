import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './shared/layout/nav-bar/nav-bar.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, MatSnackBarModule],
  template: `
    <jls-nav-bar />
    <router-outlet />
    <jls-footer />
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100svh;
      background-color: var(--background-surface);
    }
  `]
})
export class AppComponent {
  title = 'Jellicious';
}
