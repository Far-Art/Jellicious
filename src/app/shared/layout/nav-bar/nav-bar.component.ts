import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ShoppingService} from '../../services/shopping.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {APP_CATEGORIES} from '../../../app.constants';
import {Router} from '@angular/router';


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
        MenuButtonComponent
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

    constructor(private shoppingService: ShoppingService, private router: Router) {}

    goHome() {
        this.router.navigate(['/']).then(() => {
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    cartBadge(){
        return {value: this.shoppingService.totalAmount, description: `כמות פריטים בסל: ${this.shoppingService.totalAmount}`};
    }

    private scrollIntoView(id: string) {
        const el = document.getElementById(id)!;
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

}
