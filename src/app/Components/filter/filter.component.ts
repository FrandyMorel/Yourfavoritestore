import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  
  searchTerm: string = ''; // Término de búsqueda ingresado
  selectedCategory: string = ''; // Categoría seleccionada

  onCategoryChange(category: string): void {
    this.selectedCategory = category; // Actualiza la categoría seleccionada
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term; // Actualiza el término de búsqueda
  }

}
