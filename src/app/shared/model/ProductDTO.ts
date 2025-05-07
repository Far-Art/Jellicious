import {ProductType} from './ProductType';

export type ProductDTO = {
    id: number;
    name: string;
    subtitle: string;
    description: string;
    ingredients: { ingredientId: number, amount: number }[];
    price: number;
    newPrice: number;
    weight: number;
    type: ProductType;
    imageUrl: string;
}