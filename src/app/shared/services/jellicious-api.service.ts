import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDTO} from '../model/ProductDTO';
import {map, Observable, switchMap, take} from 'rxjs';
import {Ingredient} from '../model/Ingredient';
import {Product} from '../model/Product';


@Injectable({
    providedIn: 'root'
})
export class JelliciousApiService {

    private readonly products_url = 'https://jellicious-bucket.s3.il-central-1.amazonaws.com/products-list/products.json';
    private readonly ingredients_url = 'https://jellicious-bucket.s3.il-central-1.amazonaws.com/products-list/ingredients.json';

    private readonly products_url_test = '/assets/products-test.json';
    private readonly ingredients_url_test = '/assets/ingredients-test.json';

    private ingredientsMap!: Map<number, Ingredient>;

    constructor(private http: HttpClient) { }

    fetchProducts$(): Observable<Product[]> {
        return this.http.get<Ingredient[]>(this.ingredients_url_test).pipe(take(1), switchMap(ingredients => {
            this.ingredientsMap = new Map(ingredients.map(i => [i.id, i]));
            return this.http.get<ProductDTO[]>(this.products_url_test).pipe(take(1), map(dto => this.mapDtoToProduct(dto)));
        }));
    }

    private mapDtoToProduct(dto: ProductDTO[]): Product[] {
        return dto.map(dto => ({
            ...dto,
            ingredients: dto.ingredients.map(item => ({
                ingredient: this.ingredientsMap.get(item.ingredientId)!,
                amount: item.amount
            }))
        }));
    }
}