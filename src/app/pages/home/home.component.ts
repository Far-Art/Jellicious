import {Component} from '@angular/core';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
import {Product} from '../../shared/model/Product';
import {JelliciousApiService} from '../../shared/services/jellicious-api.service';


@Component({
    selector: 'jls-home',
    imports: [
        ProductCardComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    product1: Product = {
        id: 1,
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
    product2: Product = {
        id: 2,
        type: 'box',
        name: 'מארז מתוק בקטנה',
        subtitle: 'מארז גומי 6 תאים',
        price: 180,
        newPrice: 150,
        weight: 250,
        description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
        imageUrl: '/assets/boxes/box2.jpg',
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
    product3: Product = {
        id: 3,
        type: 'box',
        name: 'מארז מתוק בקטנה',
        subtitle: 'מארז גומי 6 תאים',
        price: 180,
        newPrice: 150,
        weight: 250,
        description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
        imageUrl: '/assets/boxes/box2.jpg',
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
    product4: Product = {
        id: 4,
        type: 'box',
        name: 'מארז מתוק בקטנה',
        subtitle: 'מארז גומי 6 תאים',
        price: 180,
        newPrice: 150,
        weight: 250,
        description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
        imageUrl: '/assets/boxes/box2.jpg',
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
    product5: Product = {
        id: 5,
        type: 'box',
        name: 'מארז מתוק בקטנה',
        subtitle: 'מארז גומי 6 תאים',
        price: 180,
        newPrice: 150,
        weight: 250,
        description: 'מארז סוכריות גומי מתוק לכל האהובים שלכם',
        imageUrl: '/assets/boxes/box2.jpg',
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
    products: Product[] = [this.product1, this.product2, this.product3, this.product4, this.product5];

    constructor(api: JelliciousApiService) {
        // api.fetchProducts$().subscribe(response => {
        //     this.products = response;
        // });
    }

}
