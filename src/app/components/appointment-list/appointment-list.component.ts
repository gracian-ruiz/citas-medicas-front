import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  imports: [
    MatTableModule, MatPaginatorModule, MatSortModule, 
    MatFormFieldModule, MatInputModule, CommonModule, 
    RouterLink, MatIconModule, ReactiveFormsModule
  ]
})
export class AppointmentListComponent implements OnInit {
  displayedColumns: string[] = [
    'cliente', 'fecha_hora', 'num_reconocimientos_realizados', 
    'exceso_reconocimientos', 'estado', 'acciones'
  ];
  dataSource = new MatTableDataSource<Appointment>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (response) => {
        console.log('Respuesta completa:', response);
  
        this.dataSource.data = (Array.isArray(response) ? response : response.data || []).map((appointment): Appointment => ({
          id: appointment.id,
          estado: appointment.estado,
          fecha_solicitada: appointment.fecha_solicitada,
          fecha_hora: appointment.fecha_hora ?? '',
          hora_inicio_confirmada: appointment.hora_inicio_confirmada,
          empleados_solicitados: appointment.empleados_solicitados,
          num_reconocimientos_realizados: appointment.num_reconocimientos_realizados ?? 0,
          exceso_reconocimientos: appointment.exceso_reconocimientos ?? 0,
          user_id: appointment.user_id,
          created_at: appointment.created_at,
          updated_at: appointment.updated_at,
          user: appointment.user_id ? {
            id: appointment.user_id,
            name: '', 
            email: appointment.user_email ?? '',
            razon_social: appointment.user_razon_social ?? '',
          } : undefined,
        }));
        
        
        
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  
        console.log('DataSource actualizado:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al cargar citas:', error);
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Appointment, filter: string) => {

      return data.user?.razon_social?.toLowerCase().includes(filter) ?? false;
    };
  
    this.dataSource.filter = filterValue;
  }
  
}
