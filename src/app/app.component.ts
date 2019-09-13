import { Component, OnInit } from "@angular/core";
import { AppSettingService } from "./app-setting.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private appSettingService: AppSettingService) {}
  title = "pos";
  ngOnInit() {
    // this.appSettingService.itemsReceived.subscribe(data => {});
  }
}
