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
              // Asignamos el ID al producto
              product.id = this.productId;
              this.product = product;
            }
          });
      }
    });
  }
}