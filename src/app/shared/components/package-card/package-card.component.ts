import {Component, Input, OnInit} from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {ShoppingService} from '../../services/shopping.service';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../model/Product';


@Component({
    selector: 'jls-package-card',
    imports: [
        MatFabButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardTitle,
        MatCardSubtitle,
        MatCardHeader,
        MatCardImage,
        MatCardFooter,
        MatChipSet,
        MatChip,
        NgIf,
        NgForOf
    ],
    templateUrl: './package-card.component.html',
    styleUrl: './package-card.component.scss'
})
export class PackageCardComponent implements OnInit {

    @Input({required: true}) package!: Product;

    protected isInCart = false;

    protected buttonLabel!: string;

    constructor(private shoppingService: ShoppingService) { }

    ngOnInit(): void {
        this.shoppingService.isInCart$(this.package).subscribe(isInCart => this.isInCart = isInCart);
        this.updateButtonLabel();
    }

    onButtonClick(): void {
        if (this.isInCart) {
            this.shoppingService.removeProduct(this.package);
        } else {
            this.shoppingService.addProduct(this.package);
        }
        this.updateButtonLabel();
    }

    updateButtonLabel = () => {
        this.buttonLabel = `כפתור ${this.isInCart ? 'הסר מסל ' : 'הוסך לסל '} ${this.package.name} במחיר ${this.package.newPrice ?? this.package.price} שקלים' +
        ' ${this.package.newPrice ? ' במקום' +
            ' ' + this.package.price : ''}`;
    }

}
