export interface CogsModel {
  id?: number;
  quantity:number;
  productPricePerUnit:number;
  purchaseInvoice: string;
  productName: string;
  productPrice: number;
  transportFee: number;
  labourCost: number;
  packingCost: number; // ← fixed casing to match camelCase
  tax: number;
  date: Date| string;
  totalCogs: number;
}
