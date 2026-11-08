import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs';
import { Interest } from './content';
import { publicConfig } from './public-config';
export interface LeadRequest { name: string; email: string; profile: 'independiente' | 'empresa'; need: string; technologies: string; interest: Interest }
export interface LeadResponse { id: string; status: 'received' }
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly http = inject(HttpClient);
  readonly interest = signal<Interest>('demostracion');
  readonly endpoint = publicConfig.leadEndpoint;
  submit(data: LeadRequest) {
    if (!this.endpoint) throw new Error('La recepción de solicitudes no está habilitada.');
    return this.http.post<unknown>(this.endpoint, data).pipe(timeout(15000), map(result => {
      if (!result || typeof result !== 'object' || !('id' in result) || typeof result.id !== 'string' || !result.id.trim() || !('status' in result) || result.status !== 'received') throw new Error('Respuesta no verificable');
      return result as LeadResponse;
    }));
  }
}
