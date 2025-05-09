import {Component, Input, OnInit} from '@angular/core';
import {ShoppingService} from '../../services/shopping.service';
import {Product} from '../../model/Product';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {MatFabButton} from '@angular/material/button';
import {animate, animateChild, query, state, style, transition, trigger} from '@angular/animations';


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
    animations: [
        trigger('minWidthExpand', [
            transition(':enter', [
                style({
                    minWidth: 'calc(100% + 2rem + 112px)',
                    width: '100%'
                }),
                animate('350ms ease-in-out', style({
                    minWidth: '0',
                    width: '42%'
                })),
                query('@buttonRadius', animateChild())
            ]),
            transition(':leave', [
                style({
                    minWidth: '0',
                    width: '42%'
                }),
                animate('350ms ease-in-out', style({
                    minWidth: 'calc(100% + 2rem + 112px)',
                    width: '100%'
                })),
                query('@buttonRadius', animateChild())
            ])
        ]),
        trigger('buttonRadius', [
            state('toRound',
                style({borderRadius: '2rem'})
            ),
            state('toDefault',
                style({borderRadius: 'var(--mat-sys-corner-large)'})
            ),
            transition('toRound <=> toDefault', animate('350ms ease-in-out'))
        ])
    ],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss'
})

export class ProductCardComponent implements OnInit {

    @Input({required: true}) product!: Product;

    protected buttonRadiusState: 'toRound' | 'toDefault' = 'toDefault';
    protected buttonLabel!: string;
    protected isInCartTemplate = false;
    protected isNotInCartTemplate = true;
    protected amount = 0;

    constructor(private shoppingService: ShoppingService) { }

    ngOnInit(): void {
        this.shoppingService.productData$(this.product).subscribe(data => {
            this.amount = data.amount;
            this.isInCartTemplate = this.amount > 0;
            this.buttonRadiusState = this.isInCartTemplate ? 'toRound' : 'toDefault';
            if (this.isInCartTemplate) {
                this.isNotInCartTemplate = !this.isInCartTemplate;
            }
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

    removeFromCart(): void {
        if (this.amount === 0) {
            this.isNotInCartTemplate = true;
        }
    }

}
