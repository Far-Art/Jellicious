import {Component} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {ShoppingService} from '../../services/shopping.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MenuButtonComponent} from './menu-button/menu-button.component';


export type NavItem = {
    label: string;
    click: () => void;
    icon: string;
}

@Component({
    selector: 'jls-nav-bar',
    imports: [
        NgOptimizedImage,
        MatToolbarModule,
        MenuButtonComponent,
        NgForOf
    ],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

    cartItem: NavItem = {
        label: 'סל קניות',
        icon: 'shopping_bag',
        click: () => this.shoppingService.openCartDialog()
    };

    categoriesItems: NavItem[] = [
        {
            label: 'מארזים מתוקים',
            icon: 'featured_seasonal_and_gifts',
            click: () => {}
        },
        {
            label: 'זרים מתוקים',
            icon: 'local_florist',
            click: () => {}
        },
        {
            label: 'מתוקים משלימים',
            icon: 'cookie',
            click: () => {}
        }
    ];

    constructor(protected shoppingService: ShoppingService) {}

}
