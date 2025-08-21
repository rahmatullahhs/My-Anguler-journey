export interface CheckoutModel {
    
    id: number;
    product: { id: number };
  
    name: string;
    details: string;

    invoice: string;
    
    date: Date;

    qty: number;
    price: number;     
    paid: number;
    due: number;
}
