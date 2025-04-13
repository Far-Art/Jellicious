export type Product = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  ingredients: Ingredient[];
  price: number;
  newPrice: number;
  weight: number;
  type: 'box' | 'bouquet' | 'complementary';
  imageUrl: string;
}

export type Ingredient = {
  id: number;
  name: string;
  icon: string;
  price: number;
  type: 'candy' | 'gummy' | 'chocolate' | 'marshmello' | 'alcohol';
}