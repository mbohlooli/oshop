import { ShoppingCart } from "./shopping-cart";

export class Order {
  datePlaced: string;
  items: any[];

  constructor(public userId: string, public shipping: any, public shoppingCart: ShoppingCart) {

    this.datePlaced = new Date().toDateString();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
        fullPrice: shoppingCart.totalPrice
      };
    });
  }

  public changeItems(newItems: any[]) {
    this.items = newItems;
    return this;
  }
}
