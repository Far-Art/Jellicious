import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Product} from '../model/Product';
import {APP_CATEGORIES} from '../../app.constants';
import {JelliciousApiService} from './jellicious-api.service';


export type ProductsByCategory = {
    [K in keyof typeof APP_CATEGORIES]: Product[]
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private productsMap!: Map<number, Product>;

    private productsByCategorySubject = new BehaviorSubject<ProductsByCategory>({
        bouquets: [],
        boxes: [],
        complementary: []
    });

    constructor(private api: JelliciousApiService) {
        api.products$.pipe(
            tap(response => {
                this.productsMap = new Map(response.map(p => [p.id, p]));
            })
        ).subscribe(response => {
            this.productsByCategorySubject.next(this.mapByCategory(response));
        });
    }

    get products$(): Observable<ProductsByCategory> {
        return this.productsByCategorySubject.asObservable();
    }

    getProductById(...ids: number[]): Product[] {
        return ids.map(id => this.productsMap.get(id)).filter(product => product != null);
    }

    getProductNextId() {
        return Math.max(...this.productsMap.keys()) + 1;
    }

    updateProductMap(product: Product) {
        this.productsMap.set(product.id, product);
        this.updateSubject();
    }

    deleteProductById(id: number) {
        this.productsMap.delete(id);
        this.updateSubject();
    }

    updateServerData() {
        this.api.updateServerData([...this.productsMap.values()]);
    }

    private updateSubject() {
        this.productsByCategorySubject.next(this.mapByCategory([...this.productsMap.values()]));
    }

    private mapByCategory(products: Product[]): ProductsByCategory {
        const initial: ProductsByCategory = {
            bouquets: [],
            boxes: [],
            complementary: []
        };

        if (products?.length > 0) {
            return products.reduce((
                acc: ProductsByCategory,
                item: Product
            ) => {
                acc[item.category].push(item);
                return acc;
            }, initial);
        }

        return initial;
    }

}
