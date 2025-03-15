import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  reservationForm!: FormGroup;
  reservationId!: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.reservationForm = this.fb.group({
      user_id: ['', Validators.required],
      fecha: ['', Validators.required],
      empleados_solicitados: ['', Validators.required],
      empleados_asignados: ['', Validators.required],
      hora_inicio: [''],
      estado: ['', Validators.required],
      num_reconocimientos: ['', Validators.required], // Asegurar que existe aquí
    });
    
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.reservationId = +id;
        this.cargarDatosReserva();
      }
    });
  }
  
  cargarDatosReserva() {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (reservation) => {
    
        if (reservation) {
          this.reservationForm.patchValue({
            user_id: reservation.user?.id ?? '',
            fecha: reservation.fecha_solicitada ?? '',
            empleados_solicitados: reservation.empleados_solicitados ?? '', 
            empleados_asignados: reservation.empleados_asignados ?? '',
            hora_inicio: reservation.hora_inicio_confirmada ?? '',
            estado: reservation.estado ?? '',
            num_reconocimientos: reservation.num_reconocimientos ?? 0,
          });
        
        }
      },
      error: () => {
        this.errorMessage = "Error al cargar los datos de la reserva.";
      }
    });
  }
  
  
  get f() {
    return this.reservationForm.controls;
  }

  private loadReservationData() {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (reservation) => {
        this.reservationForm.patchValue({
          user_id: reservation.user?.id ?? '',
          fecha_solicitada: reservation.fecha_solicitada ?? '',
          empleados_solicitados: reservation.empleados_solicitados ?? '',
          empleados_asignados: reservation.empleados_asignados ?? '',
          hora_inicio_confirmada: reservation.hora_inicio_confirmada ?? '',
          estado: reservation.estado ?? ''
        });
      },
      error: () => {
        this.errorMessage = "Error al cargar los datos de la reserva.";
      }
    });
  }

  updateReservation() {

    if (this.reservationForm.valid) {
      const formattedData = {
        user_id: this.reservationForm.value.user_id || '',
        fecha_solicitada: this.reservationForm.value.fecha || '', 
        empleados_solicitados: this.reservationForm.value.empleados_solicitados || 1,
        empleados_asignados: this.reservationForm.value.empleados_asignados || 1,
        hora_inicio_confirmada: this.formatTime(this.reservationForm.value.hora_inicio), 
        estado: this.reservationForm.value.estado || 'pendiente',
        num_reconocimientos: this.reservationForm.value.num_reconocimientos || 0 
      };
  
      this.reservationService.updateReservation(this.reservationId, formattedData).subscribe({
        next: () => {
          this.successMessage = "Reserva actualizada correctamente.";
          setTimeout(() => this.router.navigate(['/reservas']), 2000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || "Error al actualizar la reserva.";
        }
      });
    }
  }
  

  private formatTime(timeString: string): string {
    if (!timeString) return '';
    return timeString.slice(0, 5); // HH:mm
  }
}
