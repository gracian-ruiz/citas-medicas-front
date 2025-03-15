import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Suscribirse al estado de autenticación correctamente
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;  // Asignar el estado a la variable isLoggedIn
    });
  }

  logout(): void {
    this.authService.logout();  // Llamar al logout para eliminar el token
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
