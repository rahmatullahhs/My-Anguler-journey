export interface CogsModel {
  id?: number;
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
