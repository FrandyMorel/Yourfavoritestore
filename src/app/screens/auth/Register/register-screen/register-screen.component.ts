import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Api/Auth.service';


@Component({
  selector: 'app-registerScreen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreen {
  
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // Redirige al usuario a la página de inicio de sesión o a otra página
        this.router.navigate(['']); // Cambia la ruta según tus necesidades
        console.log('Usuario registrado exitosamente:', user);
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
        // Maneja el error, por ejemplo, mostrando un mensaje al usuario
      });
    }
}
