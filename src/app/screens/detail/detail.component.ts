import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product: any;
  productId: string | null = null;
  selectedSize: string = '';
  quantity: number = 1;


  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log('ID del producto recibido:', this.productId);

      if (this.productId) {
        this.afs
          .doc(`products/${this.productId}`)
          .valueChanges()
          .subscribe((product: any) => {
            console.log('Producto recuperado:', product);
            if (product) {
              product.id = this.productId;
              this.product = product;
              // Seleccionar la primera talla por defecto si hay tallas disponibles
              if (product.sizes && product.sizes.length > 0) {
                this.selectedSize = product.sizes[0];
              }
            }
          });
      }
    });
  }

  onSizeSelect(size: string) {
    this.selectedSize = size;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  validateQuantity() {
    // Asegurarse de que la cantidad esté dentro de los límites
    if (this.quantity < 1) {
      this.quantity = 1;
    } else if (this.quantity > this.product.stock) {
      this.quantity = this.product.stock;
    }
    // Asegurarse de que sea un número entero
    this.quantity = Math.floor(this.quantity);
  }
}