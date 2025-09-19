export interface ReinvoiceModel {
 
  id:number;
  invoiceNumber: string;
  date: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  productdetail: string;
  productqty: number;
  price: number;
  discount: number;
  paid: number;
  total: number;
  due: number;
  createdBy: string;
}

 

    
    
    
    

