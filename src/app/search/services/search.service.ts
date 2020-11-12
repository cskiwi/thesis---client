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

  // TODO: fill below in with your elastic search url (e.g.: localhost)
  serverUrl = "localhost:9200";

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
    const searchQuery = this.isEnhanced.value
      ? {
          query: {
            multi_match: {
              query,
              fields: ["alineas", "tags^10"]
            }
          }
        }
      : {
          query: {
            multi_match: {
              query,
              fields: ["alineas"]
            }
          }
        };

    if (this.serverUrl) {
      return this.httpClient.post(`http://${this.serverUrl}/`, searchQuery);
    } else {
      return of(searchQuery);
    }
  }
}
