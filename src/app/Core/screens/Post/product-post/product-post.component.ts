import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { db, storage } from 'src/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

interface ColorVariant {
  color: string;
  availableSizes: {
    size: string;
    stock: number;
  }[];
}

@Component({
  selector: 'app-productpost',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.scss']
})
export class ProductPostComponent {
  product: any = {
    name: '',
    description: '',
    price: null,
    images: [],
    variants: []
  };
  newColor: string = '';
  newSize: string = '';
  tempStock: number = 0;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in');
      }
    });
  }

  addColor() {
    if (this.newColor && !this.product.variants.some((variant: ColorVariant) => variant.color === this.newColor)) {
      this.product.variants.push({
        color: this.newColor,
        availableSizes: []
      });
      this.newColor = '';
    }
  }

  addSizeToColor(color: string) {
    const variant = this.product.variants.find((variant: ColorVariant) => variant.color === color);
    if (variant && this.newSize && this.tempStock > 0) {
      if (!variant.availableSizes.some((sizeObj: any) => sizeObj.size === this.newSize + ' US')) {
        variant.availableSizes.push({
          size: this.newSize + ' US',
          stock: this.tempStock
        });
      }
      this.newSize = '';
      this.tempStock = 0;
    }
  }

  removeColor(color: string) {
    const index = this.product.variants.findIndex((variant: ColorVariant) => variant.color === color);
    if (index > -1) {
      this.product.variants.splice(index, 1);
    }
  }

  removeSizeFromColor(color: string, size: string) {
    const variant = this.product.variants.find((variant: ColorVariant) => variant.color === color);
    if (variant) {
      const index = variant.availableSizes.findIndex((sizeObj: any) => sizeObj.size === size);
      if (index > -1) {
        variant.availableSizes.splice(index, 1);
      }
    }
  }

  async onSubmit(productForm: NgForm) {
    console.log('Iniciando submit del formulario');
    console.log('Estado del formulario:', productForm.valid);
    console.log('Datos del producto:', this.product);

    if (!productForm.valid) {
      console.log('Formulario inválido');
      return;
    }

    if (!this.product.name || !this.product.description || !this.product.price) {
      console.log('Faltan campos obligatorios');
      return;
    }

    if (!this.product.coverImage || this.product.images.length === 0) {
      console.log('Faltan imágenes');
      return;
    }

    if (!this.product.variants || this.product.variants.length === 0) {
      console.log('No hay variantes de color/talla');
      return;
    }

    const variantesInvalidas = this.product.variants.some(
      (variant: ColorVariant) => !variant.availableSizes || variant.availableSizes.length === 0
    );
    if (variantesInvalidas) {
      console.log('Hay colores sin tallas asignadas');
      return;
    }
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        console.log('Usuario no autenticado');
        throw new Error('User not authenticated');
      }
  
      const productId = uuidv4();
      console.log('ID generado:', productId);
  
      const coverImageRef = ref(storage, `products/${productId}_cover`);
      await uploadBytes(coverImageRef, this.product.coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);
      console.log('Imagen de portada subida:', coverImageUrl);
  
      const productImagesUrls = [];
      for (const image of this.product.images) {
        const imageRef = ref(storage, `products/${productId}_${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        productImagesUrls.push(imageUrl);
      }
      console.log('Imágenes adicionales subidas:', productImagesUrls);
  
      const newProduct = {
        name: this.product.name,
        description: this.product.description,
        price: Number(this.product.price),
        coverImage: coverImageUrl,
        images: productImagesUrls,
        variants: this.product.variants.map((variant: ColorVariant) => ({
          color: variant.color,
          availableSizes: variant.availableSizes.map(size => ({
            size: size.size,
            stock: Number(size.stock)
          }))
        })),
        createdAt: new Date()
      };

      console.log('Producto a guardar:', newProduct);

      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log('Producto guardado exitosamente:', docRef.id);
  
      productForm.reset();
      this.product = {
        name: '',
        description: '',
        price: null,
        images: [],
        variants: []
      };
      this.newColor = '';
      this.newSize = '';
      this.tempStock = 0;
    } catch (error) {
      console.error('Error detallado al guardar el producto:', error);
    }
  }

  onCoverImageChange(event: any) {
    const file = event.target.files[0];
    this.product.coverImage = file;
  }

  onProductImagesChange(event: any) {
    this.product.images = Array.from(event.target.files);
  }

  clearForm(event: any) {
    this.product = {
      name: '',
      description: '',
      price: null,
      images: [],
      variants: []
    };
    this.newColor = '';
    this.newSize = '';
    this.tempStock = 0;
  }
}