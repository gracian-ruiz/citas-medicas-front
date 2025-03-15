import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientApiResponse } from '../models/client-api-response.model';
import { environment } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiBaseUrl = environment.apiBaseUrl; 
  private apiUrl = this.apiBaseUrl + 'client';
 /*  private apiUrl = 'http://127.0.0.1:8001/api/client'; */

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getClients(): Observable<ClientApiResponse> {
    return this.http.get<ClientApiResponse>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getClientById(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.get<any>(`${this.apiUrl}/${id}/edit`, { headers });  // ✅ Agregado /edit
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, clientData, { headers: this.getAuthHeaders() });
  }


  updateClient(id: number, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, clientData, { headers: this.getAuthHeaders() });
  }
}
