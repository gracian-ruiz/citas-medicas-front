import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Asegúrate de tener el servicio de autenticación
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Creación del formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // Método para manejar el envío del formulario
  submit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe(
        response => {
          if (response && response.token && response.user) {
            this.authService.saveToken(response.token);  // Guarda el token
            this.authService.saveUser(response.user);  // Guarda el usuario
            console.log('Token y usuario guardados:', response.token, response.user);
            
            this.router.navigate(['/dashboard']);  // Redirigir al dashboard
          } else {
            alert('Email o contraseña incorrectos.');
          }
        },
        error => {
          console.error('Error en el login:', error);
          alert('Error en el login. Inténtalo de nuevo.');
        }
      );
    }
  }
  
}
