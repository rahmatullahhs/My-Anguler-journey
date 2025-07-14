export interface ProductModel {


  id?: string;
  name: string;
  processor: string;
  ram: string;
  storage: string;

  invoice:  string;
  discount:number;
  paid:number;
  due:number;
  price: number;
  stock_qty: number;

  graphicscard: string;
  monitor: string;

   brandId: string;
   categoryId: string;
   supplierId: string;

}