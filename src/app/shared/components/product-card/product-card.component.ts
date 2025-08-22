import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
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
    @ViewChild('increaseButton', {read: ElementRef})
    increaseButtonRef!: ElementRef<HTMLButtonElement>;

    @ViewChild('addButton', {read: ElementRef})
    addButtonRef!: ElementRef<HTMLButtonElement>;

    @ViewChild('decreaseButton', {read: ElementRef})
    decreaseButtonRef!: ElementRef<HTMLButtonElement>;

    @Input({required: true}) product!: Product;

    protected isInCartTemplate = false;
    protected buttonLabel!: string;
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

    addToCart(event?: Event): void {
        if (!this.isInCartTemplate) {
            this.shoppingService.increaseProductAmount(this.product.id);
            if (event) {
                this.focusButton('increase-button');
            }
        }
    }

    increaseAmount(): void {
        this.shoppingService.increaseProductAmount(this.product.id);
    }

    decreaseAmount(event?: Event): void {
        this.shoppingService.decreaseProductAmount(this.product.id);
        if (this.amount === 0 && event) {
            this.focusButton('add-button');
        }
    }

    focusButton(element: 'increase-button' | 'add-button' | 'delete-button') {
        let el: HTMLButtonElement;
        if (element === 'increase-button') {
            el = this.increaseButtonRef.nativeElement;
        } else if (element === 'add-button') {
            el = this.addButtonRef.nativeElement;
        } else if (element === 'delete-button') {
            el = this.decreaseButtonRef.nativeElement;
        } else {
            throw new Error('Invalid element');
        }

        setTimeout(() => {
            el?.focus();
        })
    }

    private updateButtonLabel() {
        if (this.isInCartTemplate) {
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
