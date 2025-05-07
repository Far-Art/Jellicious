import {Ingredient} from './Ingredient';
import {ProductType} from './ProductType';


export type Product = {
    id: number;
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