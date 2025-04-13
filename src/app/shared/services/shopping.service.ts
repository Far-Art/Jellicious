import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Product} from '../model/ProductTypes';
import {BehaviorSubject, filter, map, Observable, switchMap} from 'rxjs';


export type CartProductData = { quantity: number, product: Product };

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private snackDurationMs = 3500;

  private _isInCartSubject = new BehaviorSubject<void>(undefined);
  private _productDataSubject = new BehaviorSubject<void>(undefined);

  private cartMap: Map<number, BehaviorSubject<CartProductData>> = new Map();

  constructor(private snackBar: MatSnackBar) { }

  addProduct(product: Product): void {
    const subject = this.cartMap.get(product.id) ?? new BehaviorSubject({
      quantity: 0,
      product
    });

    subject.next({
      quantity: subject.value.quantity + 1,
      product: subject.value.product
    });

    this.cartMap.set(product.id, subject);
    this._isInCartSubject.next();
    this.snackBar.open(`נוסף ${product.name} לסל: כמות ${subject.value.quantity}`, undefined, {duration: this.snackDurationMs});
  }

  productData$(product: Product): Observable<CartProductData> {
    return this._productDataSubject.pipe(
        map(() => this.cartMap.get(product.id)),
        filter(data => data != null),
        switchMap(data => data.asObservable())
    );
  }

  isInCart$(product: Product): Observable<boolean> {
    return this._isInCartSubject.pipe(map(() => this.cartMap.has(product.id)));
  }

  removeProduct(product: Product): void {
    if (this.cartMap.delete(product.id)) {
      this.snackBar.open(`${product.name}הוסר מסל קניות`, undefined, {duration: this.snackDurationMs});
    }
    this._isInCartSubject.next();
  }
}
