import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  search(query) {
    this.searchService.search(query);
  }

  enhancedChanged(chcked) {
    this.searchService.setEnhanced(chcked);
  }
}
