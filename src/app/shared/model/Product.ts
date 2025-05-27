import {Ingredient} from './Ingredient';
import {ProductType} from './ProductType';
import {APP_CATEGORIES} from '../../app.constants';


export type Product = {
    id: number;
    category: keyof typeof APP_CATEGORIES;
    name: string;
    subtitle: string;
    description: string;
    ingredients: { ingredient: Ingredient, amount: number }[];
    price: number;
    newPrice: number;
    weight: number;
    type: ProductType;
    imageUrl: string;
}