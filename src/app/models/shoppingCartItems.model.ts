import { Items } from "./items.model";

export class ShoppingCartItems {
  constructor(public item: Items, public amount: number) {}
}
