import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://127.0.0.1:8001/api/reservations';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getReservations(): Observable<{ data: Reservation[] }> {
    return this.http.get<{ data: Reservation[] }>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservationData, { headers: this.getAuthHeaders() });
  }

  updateReservation(id: number, reservationData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, reservationData, { headers: this.getAuthHeaders() });
  }
}
