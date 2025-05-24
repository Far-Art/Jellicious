import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, filter, map, Observable, of, switchMap, tap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../components/cart-dialog/cart-dialog.component';
import {Product} from '../model/Product';
import {SelectionModel} from '@angular/cdk/collections';


export type CartProductData = { amount: number, product: Product };

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {

    private productDataSubject = new BehaviorSubject<void>(undefined);

    private _cartMap: Map<number, BehaviorSubject<CartProductData>> = new Map();

    private _cartUpdated = new BehaviorSubject<void>(undefined);

    private _cartSelection = new SelectionModel<CartProductData>(
        true,
        [],
        true,
        (p1, p2) => p1.product.id === p2.product.id);

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

    getSelection() {
        // return  this._cartSelection.changed.pipe(tap(() => this._cartUpdated.next()));
        return of(this._cartSelection.selected).pipe(switchMap(() => this._cartSelection.changed));
    }

    get cartSubjects$(): Observable<Observable<CartProductData>> {
        return this._cartUpdated.pipe(switchMap(() => [...this._cartMap.values()].map(o => o.asObservable())));
    }

    productData$(product: Product): Observable<CartProductData> {
        return this.productDataSubject.pipe(
            map(() => this._cartMap.get(product.id)),
            filter(data => data != null),
            switchMap(data => data.asObservable())
        );
    }

    increaseProduct(product: Product): void {
        const subject = this._cartMap.get(product.id) ?? new BehaviorSubject({
            amount: 0,
            product
        });

        subject.next({
            amount: subject.value.amount + 1,
            product: subject.value.product
        });

        this._cartMap.set(product.id, subject);
        this._cartSelection.select(subject.value);
        console.log(this._cartSelection.selected)
        this.productDataSubject.next();
    }

    decreaseProduct(product: Product): void {
        const subj = this._cartMap.get(product.id);
        if (subj && subj.value.amount > 0) {
            subj.next({
                amount: subj.value.amount - 1,
                product: product
            });

            if (subj.value.amount === 0) {
                this._cartMap.delete(product.id);
            }
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
