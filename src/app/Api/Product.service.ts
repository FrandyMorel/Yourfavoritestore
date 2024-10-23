import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private afs: AngularFirestore) { }

  getProducts(): Observable<any[]> {
    return this.afs.collection('products').valueChanges(); 
    }

  

//   private apiUrl = 'https://fakestoreapi.com/products'; // URL de la API

//  constructor(private http: HttpClient) { }

//    getProducts(): Observable<any> {
//      return this.http.get(this.apiUrl);
//    }
  
  }


