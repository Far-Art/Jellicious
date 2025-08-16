import {Product} from './Product';


export interface IOrder {
    id: string;
    products: Product[];
    totalPrice: number
    name?: string;
    phoneNumber?: string;
    dateOfPickup: string;
}