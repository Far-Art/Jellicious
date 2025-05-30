import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDTO} from '../model/ProductDTO';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../model/Product';


@Injectable({
    providedIn: 'root'
})
export class JelliciousApiService {

    private readonly products_url = 'https://jellicious-bucket.s3.il-central-1.amazonaws.com/products-list/products.json';

    private readonly products_url_test = '/assets/products-test.json';

    private productsSubject = new BehaviorSubject<Product[]>([]);

    constructor(private http: HttpClient) {
        this.http.get<ProductDTO[]>(this.products_url_test).subscribe(response => {
            this.productsSubject.next(response);
        });
    }

    get products$(): Observable<Product[]> {
        return this.productsSubject.asObservable();
    }

    updateServerData(products: Product[]) {
        const blob = new Blob([JSON.stringify(products, null, '\t')], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.json';
        a.click();

        window.URL.revokeObjectURL(url);
    }
}