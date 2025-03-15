import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model'; // Asegúrate de que la ruta del modelo sea correcta
import { AppointmentEdit } from '../models/appointment-edit-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:8001/api/appointments';  // Ajusta la URL a la de tu API

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Obtener todas las citas
  getAppointments(): Observable<{ data: Appointment[] }> {
    return this.http.get<{ data: Appointment[] }>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getAppointmentById(id: number): Observable<AppointmentEdit> {
    return this.http.get<AppointmentEdit>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()  // Asegúrate de incluir las cabeceras
    });
  }

  // Crear una cita
  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointmentData, { headers: this.getAuthHeaders() });
  }

  // Actualizar una cita
  updateAppointment(id: number, appointmentData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, appointmentData, { headers: this.getAuthHeaders() });
  }
}
