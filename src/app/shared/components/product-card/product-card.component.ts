import {Component, Input, OnInit} from '@angular/core';
import {ShoppingService} from '../../services/shopping.service';
import {Product} from '../../model/Product';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {MatFabButton} from '@angular/material/button';


@Component({
    selector: 'jls-product-card',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardImage,
        MatCardContent,
        MatCardFooter,
        MatChipSet,
        MatChip,
        MatCardActions,
        NgTemplateOutlet,
        NgForOf,
        MatFabButton,
        MatCardTitle,
        MatCardSubtitle,
        NgIf
    ],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss'
})

export class ProductCardComponent implements OnInit {

    @Input({required: true}) product!: Product;

    protected buttonLabel!: string;
    protected isInCartTemplate = false;
    protected amount = 0;

    constructor(private shoppingService: ShoppingService) { }

    ngOnInit(): void {
        this.updateButtonLabel();
        this.shoppingService.productData$(this.product).subscribe(data => {
            this.amount = data.amount;
            this.isInCartTemplate = this.amount > 0;
            this.updateButtonLabel();
        });
    }

    addToCart(): void {
        this.shoppingService.increaseProduct(this.product);
    }

    increaseAmount(): void {
        this.shoppingService.increaseProduct(this.product);
    }

    decreaseAmount(): void {
        this.shoppingService.decreaseProduct(this.product);
    }

    noop(): void {}

    private updateButtonLabel() {
        if (this.isInCartTemplate) {
            // TODO check names in many later
            if (this.amount === 1) {
                this.buttonLabel = `${this.product.name} ${this.amount} בסל`;
            } else {
                this.buttonLabel = `${this.amount} ${this.product.name} בסל`;
            }
        } else {
            if (this.product.newPrice != null) {
                this.buttonLabel = `הוסף לסל ${this.product.name} במחיר ${this.product.newPrice} שקלים, במקום ${this.product.price} `;
            } else {
                this.buttonLabel = `הוסף לסל ${this.product.name} במחיר ${this.product.price} שקלים`;
            }
        }
    }
}
