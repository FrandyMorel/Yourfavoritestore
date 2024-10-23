import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Api/Auth.service';

@Component({
  selector: 'app-core-home',
  templateUrl: './core-home.component.html',
  styleUrls: ['./core-home.component.scss']
})
export class CoreHomeComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.signOut()
      .then(() => {
        console.log('Logged out successfully');
        this.router.navigate(['']); // Redirect to the login route
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        // Handle the error appropriately, such as displaying an error message
      });
  }
}
