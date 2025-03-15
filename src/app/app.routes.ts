import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationEditComponent } from './components/reservation-edit/reservation-edit.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './components/appointment-edit/appointment-edit.component';
import { NoAutorizadoComponent } from './components/no-autorizado/no-autorizado.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },  // Solo admin
    { path: 'clientes', component: ClientListComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },  // Solo admin
    { path: 'clientes/nuevo', component: ClientFormComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },  // Solo admin
    { path: 'clientes/editar/:id', component: ClientEditComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },  // Solo admin
    { path: 'reservas', component: ReservationListComponent, canActivate: [RoleGuard], data: { roles: ['admin', 'reserva'] } },  // Admin y reservas
    { path: 'reservas/nueva', component: ReservationFormComponent, canActivate: [RoleGuard], data: { roles: ['admin', 'reserva'] } },  // Admin y reservas
    { path: 'reservas/editar/:id', component: ReservationEditComponent, canActivate: [RoleGuard], data: { roles: ['admin', 'reserva'] } },  // Admin y reservas
    { path: 'citas', component: AppointmentListComponent, canActivate: [RoleGuard], data: { roles: ['admin', 'medico'] } },  // Admin y medico
    { path: 'citas/editar/:id', component: AppointmentEditComponent, canActivate: [RoleGuard], data: { roles: ['admin', 'medico'] } },  // Admin y medico
    { path: 'no-autorizado', component: NoAutorizadoComponent },  // Página de acceso denegado
];

