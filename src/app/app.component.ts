import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './shared/nav-bar/nav-bar.component';
import {FooterComponent} from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
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
    }
  `]
})
export class AppComponent {
  title = 'Jellicious';
}
