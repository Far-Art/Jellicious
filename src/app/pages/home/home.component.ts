import {Component} from '@angular/core';
import {DailyProductComponent} from './daily-product/daily-product.component';
import {PackageCardComponent} from '../../shared/components/package-card/package-card.component';
import {Product} from '../../shared/model/ProductTypes';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'jls-home',
  imports: [
    DailyProductComponent,
    PackageCardComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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

  product2: Product = {
    id: 2,
    type: 'box',
    name: 'מארז מתוק בקטנה',
    subtitle: 'מארז גומי 6 תאים',
    price: 180,
    newPrice: 150,
    weight: 250,
    description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
    imageUrl: '/assets/boxes/box2.jpg',
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

  products: Product[] = [this.product1, this.product2];
}
