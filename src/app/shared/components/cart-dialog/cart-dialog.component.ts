import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ShoppingService} from '../../services/shopping.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/Product';


export type CartProductData = { amount: number, product: Product };

@Component({
    selector: 'jls-cart-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatTableModule
    ],
    templateUrl: './cart-dialog.component.html',
    styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent implements OnInit {

    protected dataSource = new MatTableDataSource<CartProductData>([]);
    protected displayedColumns = ['select', 'name', 'amount', 'price'];

    constructor(
        private shoppingService: ShoppingService,
        private productsService: ProductsService
    ) {}

    ngOnInit(): void {
        this.shoppingService.cartSelection$().subscribe(selectedIds => {
            this.updateDataSource(selectedIds);
        });
    }

    private updateDataSource(ids: number[]) {
        this.dataSource.data = ids.map(id => ({
            amount: this.shoppingService.productAmount(id) ?? 0,
            product: this.productsService.getById(id)[0]
        }));
    }

}
