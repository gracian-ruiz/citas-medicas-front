import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();
    const user = this.authService.getUser();

    if (!token || !user) {
      console.warn('Acceso denegado: Usuario no autenticado.');
      this.router.navigate(['/login']); // Redirigir si no hay sesión
      return false;
    }

    // Obtener los roles permitidos de la ruta
    const allowedRoles = next.data['roles'] as Array<string>;

    if (!allowedRoles || allowedRoles.length === 0) {
      console.warn('Acceso denegado: No se han definido roles permitidos.');
      this.router.navigate(['/no-autorizado']); // Redirigir si no hay roles permitidos
      return false;
    }

    // Verificar si el rol del usuario está entre los roles permitidos
    if (!allowedRoles.includes(user.rol)) {
      console.warn(`Acceso denegado: El rol '${user.rol}' no tiene acceso a esta ruta.`);
      this.router.navigate(['/no-autorizado']); // Redirigir si el rol no tiene acceso
      return false;
    }

    return true; 
  }
}
