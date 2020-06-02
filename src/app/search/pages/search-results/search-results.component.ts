import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../services/search.service';

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  results$;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.results$ = this.searchService.searchResults$;
  }
}
