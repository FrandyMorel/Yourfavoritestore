import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Api/Product.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges{
 
  @Input() searchTerm: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService, private afs: AngularFirestore, private router: Router) {}


  ngOnInit(): void {
    this.afs.collection('products').snapshotChanges().subscribe(actions => {
      console.log('Datos crudos de Firestore:', actions);
      this.products = actions.map(a => {
        const data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
      this.filteredProducts = this.products;
      console.log('Productos procesados:', this.products);
    });
  }

  showProductDetails(productId: string) {
    if (productId) {
      this.router.navigate(['/Detail', productId]);
    }
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
  
        return false;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }
}
