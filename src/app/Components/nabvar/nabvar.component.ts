import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Api/Auth.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss']
})
export class NabvarComponent {

  
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
