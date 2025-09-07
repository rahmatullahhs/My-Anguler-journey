import { ProductModel } from "./product.model";

export interface InvoiceModel {
  id?: number;
  date: Date;
  name: string;
  email: string;
  phone: string;
  address: string;

  subtotal?: number;
  discount: number;
  taxRate?: number;
  taxAmount?: number;
  total?: number;

  paid: number;
  due?: number;

  invoiceNumber: string;
  createdBy: String;
  products: ProductModel[];

}

