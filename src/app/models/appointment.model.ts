export interface User {
  id: number;
  name: string;
  email: string;
  razon_social: string; // ✅ Aquí está la razón social
}

export interface Appointment {
  id: number;
  user_id: number;
  estado: string;
  fecha_solicitada: string;
  empleados_solicitados: number;
  hora_inicio_confirmada: string;
  fecha_hora?: string;
  num_reconocimientos_realizados?: number;
  exceso_reconocimientos?: number;
  created_at: string;
  updated_at: string;
  user?: User; // ✅ Aquí va el objeto user completo
}


