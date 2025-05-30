import {APP_CATEGORIES} from '../../app.constants';


export type Product = {
    id: number;
    name: string;
    subtitle: string;
    description: string;
    category: keyof typeof APP_CATEGORIES;
    price: number;
    newPrice: number;
    weight: number;
    imageUrl: string;
    // ingredients: { ingredient: Ingredient, amount: number }[];
}