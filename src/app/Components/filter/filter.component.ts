import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() categoryChange = new EventEmitter<string>();
  @Output() searchTermChange = new EventEmitter<string>();

  searchTerm: string = '';
  selectedCategory: string = '';

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.categoryChange.emit(this.selectedCategory); // Emitir evento para cambiar categoría
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
    this.searchTermChange.emit(this.searchTerm); // Emitir evento para cambiar término de búsqueda
  }

}
