import {Component} from '@angular/core';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
import {Product} from '../../shared/model/Product';
import {CategorySectionComponent} from '../../shared/components/category-section/category-section.component';
import {APP_CATEGORIES} from '../../app.constants';
import {ProductsService} from '../../shared/services/products.service';


@Component({
    selector: 'jls-home',
    imports: [
        ProductCardComponent,
        CategorySectionComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    protected readonly APP_CATEGORIES = APP_CATEGORIES;

    bouquets: Product[] = [];
    boxes: Product[] = [];
    complementary: Product[] = [];

    constructor(service: ProductsService) {
        service.products$.subscribe(products => {
            this.bouquets = products.bouquets;
            this.boxes = products.boxes;
            this.complementary = products.complementary;
        })
    }

}
