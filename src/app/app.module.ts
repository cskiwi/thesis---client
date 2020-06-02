import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";

const material = [MatToolbarModule, MatInputModule];

@NgModule({
  imports: [BrowserModule, FormsModule, material],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
