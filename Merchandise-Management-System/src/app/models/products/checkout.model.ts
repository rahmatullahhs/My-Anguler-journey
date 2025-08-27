export interface CheckoutModel {

    id: number;
    product: { id: number };
    qty: number;

    invoiceNumber: string;
    date: Date;
    paid: number;
    due: number;

    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerEmail: string;

    subtotal: number;
    discount: number;
    taxRate: number;
    taxAmount: number;
    total: number;


    products: [];
    creatBy: string;

}


