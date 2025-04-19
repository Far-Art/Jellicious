import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {ShoppingService} from '../../services/shopping.service';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
    selector: 'jls-nav-bar',
    imports: [
        NgOptimizedImage,
        MatButton,
        MatToolbarModule
    ],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

    constructor(protected shoppingService: ShoppingService) {}

}
