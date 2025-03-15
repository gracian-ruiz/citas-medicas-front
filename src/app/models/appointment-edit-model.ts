// models/appointment-edit.model.ts
export interface AppointmentEdit {
  id: number;
  reservation_id: string;
  fecha_hora: string;
  num_reconocimientos_realizados: number | null;
  exceso_reconocimientos: number | null;
  estado: string;
  razon_social: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
