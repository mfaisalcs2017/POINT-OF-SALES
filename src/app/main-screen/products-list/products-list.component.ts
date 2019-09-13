import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Input
} from "@angular/core";
import { AppSettingService } from "src/app/app-setting.service";
import { switchMap, map } from "rxjs/operators";
import { ShoppingCartItems } from "src/app/models/shoppingCartItems.model";
import { Items } from "src/app/models/items.model";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})
export class ProductsListComponent implements OnInit {
  @Input() shoppingItems: Items;
  // @ViewChild("items", { static: false }) items: ElementRef;
  constructor(private appSettingService: AppSettingService) {}

  ngOnInit() {
    // this.items.nativeElement.style.background = this.shoppingItems.image;
  }
  updateArray() {
    this.appSettingService.addNewItem(
      new ShoppingCartItems(this.shoppingItems, 1)
    );
  }

  customCss(element) {
    if (element.id == 1) {
      return "class1";
    }
  }
  // myStyle() {
  //   return { background:  };
  // }
}
