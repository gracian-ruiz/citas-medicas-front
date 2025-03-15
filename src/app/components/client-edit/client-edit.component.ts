import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-edit',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientForm!: FormGroup;
  clientId!: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));

    this.clientForm = this.fb.group({
      codigo: ['', Validators.required],
      razon_social: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', Validators.required],
      municipio: ['', Validators.required],
      provincia: ['', Validators.required],
      fecha_inicio_contrato: ['', Validators.required],
      fecha_expiracion_contrato: ['', Validators.required],
      num_reconocimientos_contratados: ['', [Validators.required, Validators.min(0)]],
      estado_contrato: ['', Validators.required], // Agregado
      name: ['', Validators.required], // Agregado
      email: ['', [Validators.required, Validators.email]], // Agregado
      activo: [true]
    }, { validators: this.validateDates });

    this.loadClientData();
  }

  get f() {
    return this.clientForm.controls;
  }
  

  loadClientData() {
    this.clientService.getClientById(this.clientId).subscribe(client => {

      this.clientService.getClientById(this.clientId).subscribe(client => {
        this.clientForm.patchValue({
          codigo: client.id ?? '',
          razon_social: client.razon_social ?? '',
          cif: client.cif ?? client.CIF ?? '',
          direccion: client.direccion ?? '',
          municipio: client.municipio ?? '',
          provincia: client.provincia ?? '',
          fecha_inicio_contrato: client.fecha_inicio_contrato ?? '',
          fecha_expiracion_contrato: client.fecha_expiracion_contrato ?? '',
          num_reconocimientos_contratados: client.numero_reconocimientos_incluidos ?? 0,
          estado_contrato: client.estado_contrato ?? '', 
          name: client.name ?? '', 
          email: client.email ?? '', 
          activo: client.estado_contrato === 'activo'
        });
      });
      
    }, error => {
      console.error('Error cargando cliente:', error);
    });
  }
  

  updateClient() {
    if (this.clientForm.valid) {
      const updatedClient = {
        ...this.clientForm.value,
        fecha_expiracion_contrato: this.formatDate(this.clientForm.value.fecha_expiracion_contrato),
        fecha_inicio_contrato: this.formatDate(this.clientForm.value.fecha_inicio_contrato),
      };
  
      this.clientService.updateClient(this.clientId, updatedClient).subscribe({
        next: () => {
          this.successMessage = "Cliente editado correctamente.";
        },
        error: () => {
          this.errorMessage = "Error al actualizar el cliente.";
        }
      });
    }
  }
  
  private formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  }
  
  

  private validateDates(form: FormGroup) {
    const fechaInicio = new Date(form.get('fecha_inicio_contrato')?.value);
    const fechaExpiracion = new Date(form.get('fecha_expiracion_contrato')?.value);

    return fechaExpiracion >= fechaInicio ? null : { fechaInvalida: true };
  }
}
