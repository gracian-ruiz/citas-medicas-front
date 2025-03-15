import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  
})
export class ClientFormComponent {
  clientForm: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private clientService: ClientService, private router: Router) {
    this.clientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rol: new FormControl('cliente', Validators.required), // Por defecto 'cliente'
      razon_social: new FormControl('', Validators.required),
      CIF: new FormControl('', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]),
      direccion: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      fecha_inicio_contrato: new FormControl('', Validators.required),
      fecha_expiracion_contrato: new FormControl('', Validators.required),
      numero_reconocimientos_incluidos: new FormControl(0, [Validators.required, Validators.min(1)]),
      estado_contrato: new FormControl('activo', Validators.required) // Valor por defecto: "activo"
    });
  }

  get f() { return this.clientForm.controls; } // Acceso rápido a los controles

  onSubmit(): void {
    this.submitted = true;
    if (this.clientForm.invalid) return;
  
    const clientData = { ...this.clientForm.value };
  
    this.clientService.createClient(clientData).subscribe(
      () => {
        this.successMessage = 'Cliente creado correctamente';
        setTimeout(() => this.router.navigate(['/clientes']), 2000);
      },
      (error) => console.error('Error al crear el cliente', error)
    );
  }
}
