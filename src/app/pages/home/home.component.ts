import { Component } from '@angular/core';
import {DailyProductComponent} from './daily-product/daily-product.component';

@Component({
  selector: 'jls-home',
  imports: [
    DailyProductComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
