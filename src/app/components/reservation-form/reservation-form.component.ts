import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  clientes: Client[] = [];
  submitted = false;
  successMessage = '';
  filtroCliente: string = '';
  


  constructor(
    private fb: FormBuilder,
    private clienteService: ClientService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reservationForm = this.fb.group({
      user_id: ['', Validators.required],
      fecha_solicitada: ['', Validators.required],
      num_reconocimientos: ['', [Validators.required, Validators.min(1)]],
      empleados_solicitados: ['', [Validators.required, Validators.min(1)]],
      hora_inicio_confirmada: ['', Validators.required],
      filtroCliente: [''], // Asegurar que el filtro esté en el formulario
      estado: ['pendiente', Validators.required]
    });
    this.loadClientes();
  }
  
  

  loadClientes() {
    this.clienteService.getClients().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.clientes = response.map(cliente => ({
            ...cliente,
            name: cliente.razon_social
          }));
        } else {
          console.error('Error: La API no devolvió un array de clientes.', response);
          this.clientes = [];
        }
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
        this.clientes = [];
      }
    );
  }

  get f() {
    return this.reservationForm.controls;
  }

  clientesFiltrados() {
    const filtro = this.f['filtroCliente'].value || '';
    return this.clientes.filter(cliente =>
      cliente.razon_social?.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.reservationForm.invalid) {
      return;
    }
    this.reservationService.createReservation(this.reservationForm.value).subscribe({
      next: (response) => {
        console.log('Reserva guardada en la API:', response);
        this.successMessage = 'Reserva creada exitosamente.';
        
        setTimeout(() => {
          
        }, 4000);
      },
      error: (error) => {
        console.error('Error al guardar la reserva:', error);
        this.successMessage = 'Hubo un error al guardar la reserva.';
      }
    });
  }
}