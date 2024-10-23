import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginScreen } from './screens/auth/Login/login-screen/login-screen.component';
import { RegisterScreen } from './screens/auth/Register/register-screen/register-screen.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth} from '@angular/fire/auth'
import { getFirestore } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';
import { AuthService } from './Api/Auth.service';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NabvarComponent } from './Components/nabvar/nabvar.component';
import { HomeComponent } from './screens/Home/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './Api/Product.service';
import { ImgcolectionComponent } from './Components/imgcolection/imgcolection/imgcolection.component';
import { SearchComponent } from './Components/search/search.component';
import { CoreHomeComponent } from './Core/screens/core-home/core-home.component';
import { ProductPostComponent } from './Core/screens/Post/product-post/product-post.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CartComponent } from './screens/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginScreen,
    RegisterScreen,
    NabvarComponent,
    HomeComponent,
    ProductComponent,
    ImgcolectionComponent,
    SearchComponent,
    CoreHomeComponent,
    ProductPostComponent,
    CartComponent,
 
    ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
  providers: [ 
    ProductService,
    AuthService,
    { provide: initializeApp, useFactory: () => initializeApp(environment.firebaseConfig) },
    { provide: getAuth, useFactory: () => getAuth(initializeApp(environment.firebaseConfig)) },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
