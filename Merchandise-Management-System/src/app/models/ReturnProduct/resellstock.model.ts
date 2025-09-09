export interface ResellStockModel {

  id: number;
  name: string;
  details: string;
  date: Date 
  qty: number;
  price: number;
  paid: number;
}


// in a separate file, e.g., resell-stock-item.model.ts
// export interface ResellStockItem {
//   id: number;
//   name: string;
//   details: string;
//   date: Date;
//   qty: number;
//   price: number;
//   paid: number;
// }
