import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ClientApiResponse } from '../../models/client-api-response.model';
import * as XLSX from 'xlsx';  // Importar la biblioteca xlsx

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, CommonModule, RouterLink, MatIconModule]
})

export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'razon_social', 'cif', 'municipio', 'provincia', 'fecha_inicio_contrato', 'acciones'];
  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }
  getClients(): void {
    console.log('Llamando a la API para obtener clientes');
    this.clientService.getClients().subscribe(
      (response: ClientApiResponse) => { 
        console.log('Respuesta de la API recibida:', response);
        
        if (Array.isArray(response)) { 
          this.dataSource.data = response;
          console.log('Datos de clientes:', this.dataSource.data);
        } else {
          console.error('La respuesta no es un array de clientes');
        }
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }
  
   

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
