import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/Api/Product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchTerm: string = '';

  @Output() searchTermChange = new EventEmitter<string>();

  onSubmit() {
    this.searchTermChange.emit(this.searchTerm);
  }
}
