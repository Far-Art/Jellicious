import {IngredientType} from './IngredientType';


export type Ingredient = {
    id: number;
    name: string;
    icon: string;
    price: number;
    type: IngredientType;
}