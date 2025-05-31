import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {MatTableModule} from '@angular/material/table';
import {Product} from '../../shared/model/Product';
import {NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ProductManageCardComponent} from './product-manage-card/product-manage-card.component';
import {APP_CATEGORIES} from '../../app.constants';


@Component({
    selector: 'jls-admin',
    imports: [
        MatTableModule,
        NgOptimizedImage,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

    protected categories = APP_CATEGORIES;

    protected products: Product[] = [];

    protected productsColumns = ['img', 'name', 'description', 'category', 'price', 'newPrice', 'actionBtns'];

    constructor(private productsService: ProductsService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.productsService.products$.subscribe(products => {
            this.products = [...products.bouquets, ...products.boxes, ...products.complementary];
        });
    }

    editProduct(product: Product | null): void {
        this.dialog.open<ProductManageCardComponent, Product, Product>(ProductManageCardComponent, {
            data: product,
            disableClose: true
        }).afterClosed().subscribe(modified => {
            if (modified) {
                this.productsService.updateProductMap(modified);
            }
        });
    }

    deleteProduct(product: Product): void {
        this.productsService.deleteProductById(product.id);
    }

    updateData(): void {
        this.productsService.updateServerData();
    }
}
