// appointment.model.ts
export class Appointment {
    id: number;
    reservation_id: number;  // Añadir esta propiedad
    fecha_hora: string;
    num_reconocimientos_realizados: number | null;
    exceso_reconocimientos: number | null;
    estado: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    razon_social: string;  // Añadir esta propiedad
  
    constructor(
      id: number,
      reservation_id: number,   // Añadir esta propiedad en el constructor
      fecha_hora: string,
      num_reconocimientos_realizados: number | null,
      exceso_reconocimientos: number | null,
      estado: string,
      created_at: string,
      updated_at: string,
      user_id: number,
      razon_social: string   // Añadir esta propiedad en el constructor
    ) {
      this.id = id;
      this.reservation_id = reservation_id;
      this.fecha_hora = fecha_hora;
      this.num_reconocimientos_realizados = num_reconocimientos_realizados;
      this.exceso_reconocimientos = exceso_reconocimientos;
      this.estado = estado;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.user_id = user_id;
      this.razon_social = razon_social;
    }
  }
  