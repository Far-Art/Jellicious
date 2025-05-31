import {APP_CATEGORIES} from '../../app.constants';


export type Product = {
    id: number;
    name: string;
    description: string;
    category: keyof typeof APP_CATEGORIES;
    price: number;
    newPrice: number;
    imageUrl: string;
    // ingredients: { ingredient: Ingredient, amount: number }[];
}