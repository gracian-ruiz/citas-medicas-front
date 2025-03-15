// client-api-response.model.ts
import { Client } from './client.model';

export interface ClientApiResponse {
  current_page: number;
  data: Client[]; // Esto debería coincidir con la respuesta que viene del backend
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

