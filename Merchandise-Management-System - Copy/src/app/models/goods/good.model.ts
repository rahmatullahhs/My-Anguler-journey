export interface GoodModel {

    id: number;
    brand: { id: number };
    category: { id: number };
    name: string;
    details: string;

    invoice: string;
     supplier: { id: number };
    date: Date;

    qty: number;
    price: number;     
    paid: number;
    due: number;

}

// export interface GoodModel {
//   id?: number;
//   name: string;
//   details: string;
//   invoice: string;
//   date: Date;
//   qty: number;
//   price: number;
//   paid: number;
//   due: number;
//   discount?: number;

//   brand: { id: number };
//   category: { id: number };
//   supplier: { id: number };
// }




