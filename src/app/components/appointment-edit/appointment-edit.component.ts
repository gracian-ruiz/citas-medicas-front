import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentEdit } from '../../models/appointment-edit-model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css'],
})
export class AppointmentEditComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointmentId!: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicialización del formulario
    this.appointmentForm = this.fb.group({
      id: [null],
      reservation_id: ['', Validators.required],
      fecha_hora: ['', Validators.required],
      num_reconocimientos_realizados: [null],
      exceso_reconocimientos: [null],
      estado: ['', Validators.required],
      razon_social: ['', Validators.required],
      user_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la cita desde la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.appointmentId = +id;
        this.cargarDatosCita();
      }
    });
  }

  cargarDatosCita() {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (appointment: AppointmentEdit) => {
        if (appointment) {
          this.appointmentForm.patchValue({
            id: appointment.id ?? null,
            reservation_id: appointment.reservation_id ?? '',
            fecha_hora: appointment.fecha_hora ?? '',
            num_reconocimientos_realizados: appointment.num_reconocimientos_realizados ?? null,
            exceso_reconocimientos: appointment.exceso_reconocimientos ?? null,
            estado: 'realizada',
            razon_social: appointment.razon_social ?? '',
            user_id: appointment.user_id ?? ''
          });
        }
      },
      error: (err) => {
        console.error("Error al cargar los datos de la cita:", err);
        this.errorMessage = "Error al cargar los datos de la cita.";
      }
    });
  }


  get f() {
    return this.appointmentForm.controls;
  }


  updateAppointment() {
    console.log('Formulario válido:', this.appointmentForm.valid);
    console.log('Datos enviados:', this.appointmentForm.value);

    if (this.appointmentForm.valid) {
      const formattedData = {
        user_id: this.appointmentForm.value.user_id || '',
        reservation_id: this.appointmentForm.value.reservation_id || '',
        fecha_hora: this.appointmentForm.value.fecha_hora || '',
        num_reconocimientos_realizados: this.appointmentForm.value.num_reconocimientos_realizados || 0,
        exceso_reconocimientos: 0,
        estado: this.appointmentForm.value.estado || 'pendiente',
        razon_social: this.appointmentForm.value.razon_social || '',
      };

      this.appointmentService.updateAppointment(this.appointmentId, formattedData).subscribe({
        next: () => {
          this.successMessage = "Cita actualizada correctamente.";
          setTimeout(() => this.router.navigate(['/citas']), 2000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || "Error al actualizar la cita.";
        }
      });
    }
  }

  onSubmit() {
    this.updateAppointment();
  }
}