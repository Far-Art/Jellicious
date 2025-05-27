import {ProductType} from './ProductType';
import {APP_CATEGORIES} from '../../app.constants';

export type ProductDTO = {
    id: number;
    category: keyof typeof APP_CATEGORIES;
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