import {Component, Input, OnInit} from '@angular/core';
import {ShoppingService} from '../../services/shopping.service';
import {Product} from '../../model/Product';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';
import {NgTemplateOutlet} from '@angular/common';
import {MatFabButton} from '@angular/material/button';


@Component({
    selector: 'jls-product-card',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardImage,
        MatCardContent,
        MatCardFooter,
        MatCardActions,
        NgTemplateOutlet,
        MatFabButton,
        MatCardTitle
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
        this.shoppingService.productAmount$(this.product.id)
            .subscribe(amount => {
                this.amount = amount ?? 0;
                this.isInCartTemplate = this.amount > 0;
                this.updateButtonLabel();
            });
    }

    addToCart(): void {
        this.shoppingService.increaseProductAmount(this.product.id);
    }

    increaseAmount(): void {
        this.shoppingService.increaseProductAmount(this.product.id);
    }

    decreaseAmount(): void {
        this.shoppingService.decreaseProductAmount(this.product.id);
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
