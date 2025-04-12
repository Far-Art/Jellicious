import { Component } from '@angular/core';
import {DailyProductComponent} from './daily-product/daily-product.component';
import {PackageCardComponent} from '../../shared/components/package-card/package-card.component';

@Component({
  selector: 'jls-home',
  imports: [
    DailyProductComponent,
    PackageCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
