export interface ReturnproductModel {

  id: number;
  invoice: string;
  type: 'RETURN' | 'DAMAGE'; // restricts to valid values
  quantity: number;
  date: Date | string;
  reason: string;
  productName: string;
  photo: string; // could be a filename or base64 or URL
  
}


