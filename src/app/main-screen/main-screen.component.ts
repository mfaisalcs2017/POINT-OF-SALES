import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { AppSettingService } from "../app-setting.service";

@Component({
  selector: "app-main-screen",
  templateUrl: "./main-screen.component.html",
  styleUrls: ["./main-screen.component.css"]
})
export class MainScreenComponent implements OnInit {
  items;
  constructor(private appSettingService: AppSettingService) {}

  ngOnInit() {
    this.appSettingService
      .getJson()
      .pipe(map(data => data))
      .subscribe(products => {
        this.items = products;
      });
  }
}
