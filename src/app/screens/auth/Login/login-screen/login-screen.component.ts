import { AuthService } from 'src/app/Api/Auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loginScreen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreen {

   email: string = '';
   password: string = '';
   showPassword: boolean = false;

  constructor(private authService: AuthService,
    private router: Router
  ) { }
  
  
  signIn() {
      this.authService.signInWithEmail(this.email, this.password)
      .then(() => {
        console.log('Signed in successfully');
            // Check if the logged-in user is admin05@gmail.com
            if (this.email === 'admin05@gmail.com') {
              this.router.navigate(['core']); // Navigate to 'core' route
            } else {
              this.router.navigate(['home']); // Navigate to the default route
            }
          })

      .catch((error) => {
        console.error('Error signing in:', error);
      });
 }

 togglePassword() { // Add this function
  this.showPassword = !this.showPassword;
}
}
