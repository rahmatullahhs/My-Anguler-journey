export interface ProductModel {


  id?: string;
  name: string;
  processor: string;
  ram: string;
  storage: string;
  graphicscard: string;
  monitor: string;


  discount:number;
  paid:number;
  due:number;
  invoice:  string;
  supplierId: string;

  price: number;
  stock_qty: number;

   brandId: string;
   categoryId: string;
   

}