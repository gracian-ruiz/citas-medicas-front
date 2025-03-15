export interface Reservation {
  id: number;
  fecha_solicitada: string;
  empleados_solicitados: number;
  empleados_asignados?: number;
  hora_inicio_confirmada?: string;
  num_reconocimientos?: number;
  estado: string;
  user?: {
    id: number;
    name: string;
    email: string;
    razon_social: string;
  };
}
