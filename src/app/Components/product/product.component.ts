import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/Api/Product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges{
 
  @Input() searchTerm: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) {}

  //  ngOnInit() {
  //    this.productService.getProducts().subscribe(products => {
  //      this.products = products;
  //    this.filteredProducts = products;
  //  });
  //  }

   ngOnInit() {
     this.productService.getProducts().subscribe(products => {
       this.products = products;
       this.filteredProducts = products;
     });
   }

  ngOnChanges() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product => {
        // Coincidencia parcial en el nombre
        if (product.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          return true;
        }
  
        // Coincidencia parcial en la descripción
         if (product.description && product.description.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          return true;
         }
  
        // // Puedes agregar más condiciones para otras propiedades, por ejemplo:
        // if (product.category && product.category.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        //   return true;
        //  }
  
        // Si no hay ninguna coincidencia, retorna false
        return false;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }
}
