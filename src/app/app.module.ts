import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchBarComponent } from "./search/components/search-bar/search-bar.component";
import { SearchResultsComponent } from "./search/pages/search-results/search-results.component";

const baseModules = [BrowserModule, BrowserAnimationsModule, HttpClientModule];
const material = [MatToolbarModule, MatInputModule, MatCheckboxModule];

@NgModule({
  imports: [baseModules, FormsModule, material],
  declarations: [AppComponent, SearchBarComponent, SearchResultsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
