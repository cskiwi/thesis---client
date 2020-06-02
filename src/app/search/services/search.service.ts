import { Injectable } from "@angular/core";
import { Observable, Subject, ReplaySubject, of, BehaviorSubject } from "rxjs";
import {
  map,
  debounceTime,
  tap,
  startWith,
  flatMap,
  filter
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  searchResults$: Observable<any>;
  searchQuery = new BehaviorSubject<string>(null);
  isEnhanced = new BehaviorSubject<boolean>(false);

  // TODO: fill below in with your server url (e.g.: localhost)
  serverUrl = null;

  constructor(private httpClient: HttpClient) {
    this.searchResults$ = this.searchQuery.pipe(
      debounceTime(600),
      filter(x => !!x),
      flatMap(x => this.searchDocuments(x))
    );
  }

  search(query: string) {
    this.searchQuery.next(query);
  }

  setEnhanced(enhanced: boolean) {
    this.isEnhanced.next(enhanced);
    // Re-trigger the last query
    this.searchQuery.next(this.searchQuery.value);
  }

  private searchDocuments(query: string) {
    if (this.serverUrl) {
      return this.httpClient.get(
        `http://${this.serverUrl}/?query=${query}&enhanced=${
          this.isEnhanced.value
        }`
      );
    } else {
      if (!this.isEnhanced.value) {
        return of({
          query: {
            multi_match: {
              query,
              fields: ["alineas"]
            }
          }
        });
      } else {
        return of({
          query: {
            multi_match: {
              query,
              fields: ["alineas", "tags"]
            }
          }
        });
      }
    }
  }
}
