import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, Routes } from '@angular/router';
import {CdkMenuModule} from '@angular/cdk/menu';
import { LoginScreen } from './screens/auth/Login/login-screen/login-screen.component';
import { RegisterScreen } from './screens/auth/Register/register-screen/register-screen.component';
import { HomeComponent } from './screens/Home/home/home.component';
import { ImgcolectionComponent } from './Components/imgcolection/imgcolection/imgcolection.component';
import { CoreHomeComponent } from './Core/screens/core-home/core-home.component';
import { ProductPostComponent } from './Core/screens/Post/product-post/product-post.component';
import { CartComponent } from './screens/cart/cart.component';
import { DetailComponent } from './screens/detail/detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: LoginScreen},
  {path: 'register', component: RegisterScreen},
  {path: 'slides', component: ImgcolectionComponent},
  {path: 'core', component: CoreHomeComponent},
  {path: 'PostProduct', component: ProductPostComponent},
  {path: 'Cart', component: CartComponent},
  { path: 'Detail/:id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MatSlideToggleModule,CdkMenuModule,]
})
export class AppRoutingModule { }
