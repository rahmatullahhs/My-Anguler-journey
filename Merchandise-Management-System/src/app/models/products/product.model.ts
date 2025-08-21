export interface ProductModel {
    id: number;
    category: 'Laptop' | 'Accessory' | 'Brand PC';
    brand: string;
    name: string;
    model: string;
    details:string;
    stock: number;
    price: number;

}