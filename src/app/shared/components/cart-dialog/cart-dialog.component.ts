import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {CartProductData, ShoppingService} from '../../services/shopping.service';
import {AsyncPipe, NgForOf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';


@Component({
    selector: 'jls-cart-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        NgForOf,
        AsyncPipe
    ],
    templateUrl: './cart-dialog.component.html',
    styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent implements OnInit {

    constructor(protected service: ShoppingService) {}

    products$: BehaviorSubject<CartProductData>[] = [];

    ngOnInit(): void {
        this.service.getSelection().subscribe(data => {
            console.log(data)
        });
        // this.service.cartSubjects$.subscribe(v => {
        //     console.log(v)
        // })
    }

}
