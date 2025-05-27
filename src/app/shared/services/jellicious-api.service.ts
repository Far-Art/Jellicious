import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductDTO} from '../model/ProductDTO';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {Ingredient} from '../model/Ingredient';
import {Product} from '../model/Product';


@Injectable({
    providedIn: 'root'
})
export class JelliciousApiService {

    private readonly products_url = 'https://jellicious-bucket.s3.il-central-1.amazonaws.com/products-list/products.json';
    private readonly ingredients_url = 'https://jellicious-bucket.s3.il-central-1.amazonaws.com/products-list/ingredients.json';

    private ingredientsMap!: Map<number, Ingredient>;

    constructor(private http: HttpClient) { }

    fetchProducts$(): Observable<Product[]> {
        // return this.http.get<Ingredient[]>(this.ingredients_url).pipe(take(1), switchMap(ingredients => {
        //     this.ingredientsMap = new Map(ingredients.map(i => [i.id, i]));
        //     return this.http.get<ProductDTO[]>(this.products_url).pipe(take(1), map(dto => this.mapDtoToProduct(dto)));
        // }));
        return of(this.fetchTest());
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

    private fetchTest(): Product[] {
        return [
            {
                id: 1,
                category: 'boxes',
                type: 'box',
                name: 'מארז מתוק',
                subtitle: 'מארז גומי 24 תאים',
                price: 250,
                newPrice: 200,
                weight: 1000,
                description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
                imageUrl: '/assets/boxes/box1.jpg',
                ingredients: [
                    {
                        ingredient: {
                            id: 1,
                            type: 'gummy',
                            name: 'סוכריות גומי',
                            icon: '🍬',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 2,
                            type: 'marshmello',
                            name: 'מרשמלו',
                            icon: '🍡',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 3,
                            type: 'chocolate',
                            name: 'סוכריות שוקולד',
                            icon: '🍫',
                            price: 0.15
                        },
                        amount: 1
                    }
                ]
            },
            {
                id: 2,
                category: 'boxes',
                type: 'box',
                name: 'מארז מתוק',
                subtitle: 'מארז גומי 24 תאים',
                price: 250,
                newPrice: 200,
                weight: 1000,
                description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
                imageUrl: '/assets/boxes/box1.jpg',
                ingredients: [
                    {
                        ingredient: {
                            id: 1,
                            type: 'gummy',
                            name: 'סוכריות גומי',
                            icon: '🍬',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 2,
                            type: 'marshmello',
                            name: 'מרשמלו',
                            icon: '🍡',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 3,
                            type: 'chocolate',
                            name: 'סוכריות שוקולד',
                            icon: '🍫',
                            price: 0.15
                        },
                        amount: 1
                    }
                ]
            },
            {
                id: 3,
                category: 'bouquets',
                type: 'box',
                name: 'מארז מתוק',
                subtitle: 'מארז גומי 24 תאים',
                price: 250,
                newPrice: 200,
                weight: 1000,
                description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
                imageUrl: '/assets/boxes/box1.jpg',
                ingredients: [
                    {
                        ingredient: {
                            id: 1,
                            type: 'gummy',
                            name: 'סוכריות גומי',
                            icon: '🍬',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 2,
                            type: 'marshmello',
                            name: 'מרשמלו',
                            icon: '🍡',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 3,
                            type: 'chocolate',
                            name: 'סוכריות שוקולד',
                            icon: '🍫',
                            price: 0.15
                        },
                        amount: 1
                    }
                ]
            },
            {
                id: 4,
                category: 'bouquets',
                type: 'box',
                name: 'מארז מתוק',
                subtitle: 'מארז גומי 24 תאים',
                price: 250,
                newPrice: 200,
                weight: 1000,
                description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
                imageUrl: '/assets/boxes/box1.jpg',
                ingredients: [
                    {
                        ingredient: {
                            id: 1,
                            type: 'gummy',
                            name: 'סוכריות גומי',
                            icon: '🍬',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 2,
                            type: 'marshmello',
                            name: 'מרשמלו',
                            icon: '🍡',
                            price: 0.15
                        },
                        amount: 1
                    },
                    {
                        ingredient: {
                            id: 3,
                            type: 'chocolate',
                            name: 'סוכריות שוקולד',
                            icon: '🍫',
                            price: 0.15
                        },
                        amount: 1
                    }
                ]
            }
        ]
    }

}