export interface ReinvoiceModel {
 
      id?: number;
      date: Date;

      name: string;
      email: string;
      phone: string;
      address: string;
    
      subtotal?: number;
      discount: number;
      taxAmount?: number;

      total?: number;
      paid: number;
      due?: number;
    
      invoiceNumber: string;
      createdBy: String;
 

    
    }
    
    

