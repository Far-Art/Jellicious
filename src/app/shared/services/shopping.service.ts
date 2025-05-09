import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, filter, map, Observable, switchMap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../components/cart-dialog/cart-dialog.component';
import {Product} from '../model/Product';


export type CartProductData = { amount: number, product: Product };

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {

    private productDataSubject = new BehaviorSubject<void>(undefined);

    private cartMap: Map<number, BehaviorSubject<CartProductData>> = new Map();

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

    productData$(product: Product): Observable<CartProductData> {
        return this.productDataSubject.pipe(
            map(() => this.cartMap.get(product.id)),
            filter(data => data != null),
            switchMap(data => data.asObservable())
        );
    }

    increaseProduct(product: Product): void {
        const subject = this.cartMap.get(product.id) ?? new BehaviorSubject({
            amount: 0,
            product
        });

        subject.next({
            amount: subject.value.amount + 1,
            product: subject.value.product
        });

        this.cartMap.set(product.id, subject);
        this.productDataSubject.next();
    }

    decreaseProduct(product: Product): void {
        const subj = this.cartMap.get(product.id);
        if (subj && subj.value.amount > 0) {
            subj.next({
                amount: subj.value.amount - 1,
                product: product
            });
            this.productDataSubject.next();
        }
    }

    openCartDialog() {
        this.dialog.open(CartDialogComponent, {
            position: {
                right: '0',
                top: '0'
            }
        });
    }
}
