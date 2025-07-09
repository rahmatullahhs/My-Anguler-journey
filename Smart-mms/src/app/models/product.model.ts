export class ProductModel {


  id: string;
  name: string;
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  price: number;
  stock_qty: number;
  graphicscard: string;
  monitor: string;


  constructor(id: string, name: string, brand: string, processor: string,
    ram: string, storage: string, price: number,
    stock_qty: number, graphicscard: string, monitor: string) {

    this.id = id;
    this.name = name;
    this.brand = brand;
    this.ram = ram;
    this.storage = storage;
    this.stock_qty = stock_qty;
    this.price = price;
    this.processor = processor;
    this.graphicscard = graphicscard;
    this.monitor = monitor;
  }

}