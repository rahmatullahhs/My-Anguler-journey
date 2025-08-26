export interface CheckoutModel {

    id: number;
    product: { id: number };
    qty: number;
    subtotal: number;

    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerEmail: string;


    invoice: string;
    date: Date;
    paid: number;
    due: number;

    creatBy:string;

}
