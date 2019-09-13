import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { AppSettingService } from "src/app/app-setting.service";
import { map, last } from "rxjs/operators";
import { Subscription } from "rxjs";
import { SlicePipe } from "@angular/common";
import { Items } from "src/app/models/items.model";
import { ShoppingCartItems } from "src/app/models/shoppingCartItems.model";

@Component({
  selector: "app-products-amount",
  templateUrl: "./products-amount.component.html",
  styleUrls: ["./products-amount.component.css"]
})
export class ProductsAmountComponent implements OnInit {
  cartItems: ShoppingCartItems[];
  cartItems1: ShoppingCartItems[];
  date = new Date();
  formatted_date;
  totalAmount;
  subsVar: Subscription;
  @ViewChild("showModal", { static: true }) showModal: ElementRef;

  constructor(private appSettingService: AppSettingService) {
    this.formatted_date =
      this.appendLeadingZeroes(this.date.getDate()) +
      "-" +
      this.appendLeadingZeroes(this.date.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(this.date.getFullYear()) +
      " " +
      this.appendLeadingZeroes(this.date.getHours()) +
      ":" +
      this.appendLeadingZeroes(this.date.getMinutes()) +
      ":" +
      this.appendLeadingZeroes(this.date.getSeconds());
  }

  ngOnInit() {
    this.cartItems = this.appSettingService.shoppingCartItems();
    this.cartItems1 = this.appSettingService.shoppingCartItems();
    this.totalAmount = this.appSettingService.totalAmount();
    this.getDetails();
  }
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
  getDetails() {
    this.subsVar = this.appSettingService.itemsReceived
      .pipe(map(data => data))
      .subscribe((data: ShoppingCartItems[]) => {
        this.cartItems = data;
        this.cartItems1 = data;
        this.totalAmount = this.appSettingService.totalAmount();
      });
  }
  dataIncrease(item: ShoppingCartItems) {
    this.appSettingService.updateItemAmount(item, item.amount + 1);
  }

  dataDecrease(item: ShoppingCartItems) {
    let newAmount = item.amount === 1 ? item.amount : item.amount - 1;
    this.appSettingService.updateItemAmount(item, newAmount);
  }
  checkAmount(item: ShoppingCartItems) {
    this.appSettingService.updateItemAmount(
      item,
      item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
    );
  }
  delete(event: KeyboardEvent, item: ShoppingCartItems) {
    event.stopPropagation();
    event.preventDefault();
    this.appSettingService.deleteItem(item);
  }
  totalNewAmountOnVat() {
    return this.appSettingService.totalAmountAfterVat();
  }
  totalNewAmountonDiscount() {
    return this.appSettingService.totalAmountAfterDiscount();
  }
  finalAmount() {
    return this.appSettingService.discountedAndVatAddedAmount();
  }
  cancelSale() {
    this.appSettingService.clearCart();
  }
  getTotalItems() {
    return this.appSettingService.getItemsCount();
  }

  openModal() {
    this.showModal.nativeElement.style.display = "block";
  }
  closeModal() {
    this.showModal.nativeElement.style.display = "none";
    this.cancelSale();
  }

  ngOnDestroy() {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }
}
