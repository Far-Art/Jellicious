import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from './shared/layout/nav-bar/nav-bar.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAnchor} from '@angular/material/button';
import {Product} from './shared/model/ProductTypes';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, MatSnackBarModule, MatAnchor],
  template: `
      <a mat-flat-button class="skip-link" href="#main-content">דלג לתוכן הראשי</a>
      <jls-nav-bar />
<!--          <aside>-->
<!--              <jls-package-card [package]="product1" />-->
<!--          </aside>-->
          <router-outlet />
      <jls-footer />
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-rows: 1fr auto 1fr;
      min-height: 100svh;
      background-color: var(--background-surface);

      .skip-link {
        position: absolute;
        right: 1rem;
        top: -4rem;
        overflow: hidden;
        transition: top 100ms ease-in-out;
        z-index: 1001;
        padding: 8px 16px;
        outline: 0.5rem solid;
      }

      .skip-link:focus {
        top: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'Jellicious';

  product1: Product = {
    id: 1,
    type: 'box',
    name: 'מארז מתוק',
    subtitle: 'מארז גומי 24 תאים',
    price: 250,
    newPrice: 200,
    weight: 1000,
    description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
    imageUrl: '/assets/boxes/box1.jpg',
    ingredients: [
      {
        id: 1,
        type: 'gummy',
        name: 'סוכריות גומי',
        icon: '🍬',
        price: 0.15
      },
      {
        id: 2,
        type: 'marshmello',
        name: 'מרשמלו',
        icon: '🍡',
        price: 0.15
      },
      {
        id: 3,
        type: 'chocolate',
        name: 'סוכריות שוקולד',
        icon: '🍫',
        price: 0.15
      }
    ]
  }
}
