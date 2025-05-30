import {Component} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {ShoppingService} from '../../services/shopping.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {APP_CATEGORIES} from '../../../app.constants';
import {RouterLink} from '@angular/router';


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
        NgForOf,
        RouterLink
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
            label: APP_CATEGORIES.bouquets,
            icon: 'local_florist',
            click: () => this.scrollIntoView('bouquets-section')
        },
        {
            label: APP_CATEGORIES.boxes,
            icon: 'featured_seasonal_and_gifts',
            click: () => this.scrollIntoView('boxes-section')
        },
        {
            label: APP_CATEGORIES.complementary,
            icon: 'cookie',
            click: () => this.scrollIntoView('complementary-section')
        }
    ];

    constructor(protected shoppingService: ShoppingService) {}

    private scrollIntoView(id: string) {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

}
