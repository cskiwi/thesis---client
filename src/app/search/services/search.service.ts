import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchResults$: Observable<any>;
  searchQuery = new Subject<string>();
  isEnhanced = new ReplaySubject<boolean>();

  constructor(httpClient: HttpClient) {
    this.searchQuery.pipe(
      debounceTime(600),
      map((x) => {
        return {
          query: {
            term: {
              user: {
                value: x,
                boost: 1.0,
              },
            },
          },
        };
      })
    );
  }

  search(query: string) {
    this.searchQuery.next(query);
  }

  setEnhanced(enhanced: boolean){
    this.isEnhanced.next(enhanced);
  }
}
