export interface CogsModel {

  id: number;
  purchaseInvoice: string;

  // Product details
  productName: string;
  productQty: number;

  // Cost components
  productCost: number; // e.g., base product cost (from invoice)
  transportFee: number;
  labourCost: number;
  packingCost: number;
  tax: number;

  // Date of transaction
  date:Date ;

  // Calculated fields
  totalCogs?: number;          // Total COGS = all costs
  eachProductPrice?: number;   // Total COGS / productQty
}
