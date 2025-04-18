import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {ShoppingService} from '../../services/shopping.service';

@Component({
  selector: 'jls-nav-bar',
  imports: [
    NgOptimizedImage,
    MatList,
    MatListItem,
    MatButton
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(protected shoppingService: ShoppingService) {}

}
