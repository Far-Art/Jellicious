import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
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

    get products$(): Observable<ProductsByCategory> {
        return this.productsByCategorySubject.asObservable();
    }

    getById(...ids: number[]): Product[] {
        return ids.map(id => this.productsMap.get(id)).filter(product => product != null);
    }

    constructor(api: JelliciousApiService) {
        api.fetchProducts$().pipe(
            tap(response => {
                this.productsMap = new Map(response.map(p => [p.id, p]));
            }),
            map(response => {
                return response.reduce((
                    acc: ProductsByCategory,
                    item: Product
                ) => {
                    acc[item.category].push(item);
                    return acc;
                }, {
                    bouquets: [],
                    boxes: [],
                    complementary: []
                });
            })).subscribe(result => {
            this.productsByCategorySubject.next(result);
        })
    }

}
