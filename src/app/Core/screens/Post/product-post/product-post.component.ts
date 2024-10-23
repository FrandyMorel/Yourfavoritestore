import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { db, storage } from 'src/firebase.config'; // Importa db y storage de firebase.config.ts
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-productpost',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.scss']
})
export class ProductPostComponent {
  
  product: any = {
    images: []
  };
  
  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in');
        // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        // Puedes usar el router de Angular para esto
      }
    });
  }

  async onSubmit(productForm: NgForm) {
    if (!productForm.valid) {
      return;
    }
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error('User not authenticated');
      }
  
      // Generar un ID único para el producto
      const productId = uuidv4();
  
      // Subir la imagen de portada
      const coverImageRef = ref(storage, `products/${productId}_cover`);
      await uploadBytes(coverImageRef, this.product.coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);
  
      // Subir las imágenes del producto
      const productImagesUrls = [];
      for (const image of this.product.images) {
        const imageRef = ref(storage, `products/${productId}_${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        productImagesUrls.push(imageUrl);
      }
  
      // Guardar el producto en Firestore
      const newProduct = {
        ...this.product,
        coverImage: coverImageUrl,
        images: productImagesUrls
      };
      // Aquí se ejecuta addDoc 
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log('Producto guardado exitosamente:', docRef.id);
  
      // Limpiar el formulario después de guardar
      productForm.reset();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  }

  onCoverImageChange(event: any) {
    const file = event.target.files[0];
    this.product.coverImage = file;
  }

  onProductImagesChange(event: any) {
    this.product.images = Array.from(event.target.files);
  }

  clearForm (event: any) {
    this.clearForm
  }
}