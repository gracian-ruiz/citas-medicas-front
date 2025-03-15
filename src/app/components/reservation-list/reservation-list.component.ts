import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  imports: [
    MatTableModule, MatPaginatorModule, MatSortModule, 
    MatFormFieldModule, MatInputModule, CommonModule, 
    RouterLink, MatIconModule
  ]
})
export class ReservationListComponent implements OnInit {
  displayedColumns: string[] = [
    'cliente', 'fecha_solicitada', 'empleados_solicitados', 
    'empleados_asignados', 'hora_inicio_confirmada', 'estado_contrato', 'acciones'
  ];
  dataSource = new MatTableDataSource<Reservation>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations().subscribe(
      (response) => {
        console.log('Respuesta completa:', response);

        if (Array.isArray(response)) {
          this.dataSource.data = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.dataSource.data = response.data;
        } else {
          console.error('Formato inesperado:', response);
        }

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        
        console.log('DataSource actualizado:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al cargar reservas:', error);
      }
    );    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
