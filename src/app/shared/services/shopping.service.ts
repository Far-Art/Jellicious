import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../components/cart-dialog/cart-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {APP_CONSTANTS} from '../../app.constants';


@Injectable({
    providedIn: 'root'
})
export class ShoppingService {

    private amountsUpdatedSubject = new BehaviorSubject<void>(undefined);
    private selectedIdsSubject = new BehaviorSubject<Set<number>>(new Set());
    private inCartIdsSubject = new BehaviorSubject<Set<number>>(new Set());

    /* productId vs amount */
    private _cartAmountMap: Map<number, number> = new Map();

    private _cartSelection = new SelectionModel<number>(
        true,
        []
    );

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

    get totalAmount(): number {
        return [...this._cartAmountMap.values()].reduce((acc, value) => acc + value, 0);
    }

    get inCartIds$(): Observable<Set<number>> {
        return this.inCartIdsSubject.asObservable();
    }

    toggleSelect(id: number) {
        this._cartSelection.toggle(id);
        this.selectedIdsSubject.next(new Set(this._cartSelection.selected));
    }

    selectAll() {
        this._cartSelection.select(...this._cartAmountMap.keys());
        this.selectedIdsSubject.next(new Set(this._cartSelection.selected));
    }

    deselectAll() {
        this._cartSelection.clear();
        this.selectedIdsSubject.next(new Set());
    }

    cartSelection$() {
        return this.selectedIdsSubject.asObservable();
    }

    productAmount(productId: number): number | undefined {
        return this._cartAmountMap.get(productId);
    }

    productAmount$(productId: number): Observable<number | undefined> {
        return this.amountsUpdatedSubject.pipe(
            map(() => this.productAmount(productId))
        );
    }

    increaseProductAmount(productId: number): void {
        const totalAmount = this.totalAmount;
        if (totalAmount >= APP_CONSTANTS.maxProductsPerRequest) {
            this.snackBar.open(`לא ניתן להוסיף יותר מ-${APP_CONSTANTS.maxProductsPerRequest} פריטים להזמנה`, 'הבנתי', {
                duration: 3500,
                horizontalPosition: 'center',
                panelClass: 'snackbar-warning'
            });
            return;
        }

        this._cartAmountMap.set(productId, (this._cartAmountMap.get(productId) ?? 0) + 1);
        if (this._cartAmountMap.get(productId) === 1) {
            this._cartSelection.select(productId);
            this.inCartIdsSubject.next(new Set(this._cartAmountMap.keys()));
            this.selectedIdsSubject.next(new Set(this._cartSelection.selected));
        }
        this.amountsUpdatedSubject.next();
    }

    decreaseProductAmount(productId: number): void {
        const amount: number = (this._cartAmountMap.get(productId) ?? 1) - 1;
        if (amount === 0) {
            this._cartAmountMap.delete(productId);
            this._cartSelection.deselect(productId);
            this.inCartIdsSubject.next(new Set(this._cartAmountMap.keys()));
            this.selectedIdsSubject.next(new Set(this._cartSelection.selected));
        } else {
            this._cartAmountMap.set(productId, amount);
        }
        this.amountsUpdatedSubject.next();
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
