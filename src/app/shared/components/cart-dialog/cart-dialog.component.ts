import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {ShoppingService} from '../../services/shopping.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/Product';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';


export type CartProductData = { amount: number, product: Product };

@Component({
    selector: 'jls-cart-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatTableModule,
        NgOptimizedImage,
        CurrencyPipe,
        MatMiniFabButton,
        MatCheckbox
    ],
    templateUrl: './cart-dialog.component.html',
    styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent implements OnInit {

    protected dataSource = new MatTableDataSource<CartProductData>([]);
    protected selection = new SelectionModel<number>(true);
    protected displayedColumns = ['select', 'img', 'name', 'amount', 'price'];

    constructor(
        private shoppingService: ShoppingService,
        private productsService: ProductsService
    ) {}

    ngOnInit(): void {
        this.shoppingService.cartSelection$().subscribe(selectedIds => {
            this.updateDataSource(selectedIds);
        });
    }

    getTotalCost() {
        return this.dataSource.data.map(t => (t.product.newPrice ?? t.product.price) * t.amount).reduce((acc, value) => acc + value, 0);
    }

    getTotalAmount() {
        return this.shoppingService.totalAmount;
    }

    protected checkboxLabel(row?: CartProductData): string {
        if (!row) {
            return '';
        }
        if (row.amount > 0) {
            return `${row.amount} ${row.product.name}`;
        } else {
            return `${row.product.name}`;
        }

    }

    protected isAllSelected(): boolean {
        return this.selection.selected.length === this.dataSource.data.length;
    }

    protected toggleAllRows() {
        this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource.data.map(row => row.product.id));
    }

    private updateDataSource(ids: number[]) {
        this.dataSource.data = ids.map(id => ({
            amount: this.shoppingService.productAmount(id) ?? 0,
            product: this.productsService.getProductById(id)[0]
        }));
    }

}
