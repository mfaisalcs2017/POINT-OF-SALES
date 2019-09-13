import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { Items } from "./models/items.model";
import { ShoppingCartItems } from "./models/shoppingCartItems.model";

@Injectable({
  providedIn: "root"
})
export class AppSettingService {
  shoppingArray: ShoppingCartItems[];
  counter;
  newArr = [];
  count;
  itemsReceived: Subject<ShoppingCartItems[]> = new Subject<
    ShoppingCartItems[]
  >();
  movableItems = this.itemsReceived.asObservable();
  constructor(private httpClient: HttpClient) {
    this.shoppingArray = [];
  }

  public getJson() {
    return this.httpClient.get("assets/pos.products.json");
  }

  saveItems(data) {
    this.shoppingArray.push(data);
    this.itemsReceived.next(this.shoppingArray.slice());
  }

  shoppingCartItems() {
    return this.shoppingArray.slice();
  }

  addNewItem(shoppingItems: ShoppingCartItems) {
    if (this.getItemsIds().includes(shoppingItems.item.id)) {
      this.shoppingArray.forEach(item => {
        if (item.item.id === shoppingItems.item.id) {
          item.amount += shoppingItems.amount;
        }
      });
    } else {
      this.shoppingArray.push(shoppingItems);
    }
    this.itemsReceived.next(this.shoppingArray.slice());
  }
  getItemsIds() {
    return this.shoppingCartItems().map(items => items.item.id);
  }

  updateItemAmount(item: ShoppingCartItems, latestAmount: number) {
    this.shoppingArray.forEach(cartItem => {
      if (cartItem.item.id === item.item.id) {
        cartItem.amount = latestAmount;
      }
    });
    this.itemsReceived.next(this.shoppingArray.slice());
  }

  totalAmount() {
    let amount = 0;
    this.shoppingArray.forEach(cartItem => {
      amount += cartItem.amount * cartItem.item.price;
    });
    return amount;
  }
  getItemsCount() {
    let count = 0;
    this.shoppingArray.forEach(cartItem => {
      count += cartItem.amount;
    });
    return count;
  }
  totalAmountAfterVat() {
    let amount;
    amount = this.totalAmount() * (10 / 100);
    return amount;
  }
  totalAmountAfterDiscount() {
    let amount;
    amount = this.totalAmount() * (10 / 100);
    return amount;
  }
  discountedAndVatAddedAmount() {
    return (
      this.totalAmount() +
      this.totalAmountAfterVat() -
      this.totalAmountAfterDiscount()
    );
  }
  deleteItem(item: ShoppingCartItems) {
    let index = this.shoppingArray.findIndex(elem => elem === item);
    this.shoppingArray.splice(index, 1);
    this.itemsReceived.next(this.shoppingArray.slice());
  }
  clearCart() {
    this.shoppingArray = [];
    this.itemsReceived.next(this.shoppingArray.slice());
  }
}
