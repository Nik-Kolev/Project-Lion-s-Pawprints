import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.VITE_SUPABASE_URL,
      environment.VITE_SUPABASE_API_KEY
    );
  }

  supabaseUploader(file: File, category: string): Observable<string> {
    return from(
      this.supabase.storage
        .from('pawprints')
        .upload(`${category}/${Date.now()}.jpg`, file, {
          cacheControl: '3600',
          upsert: true,
        })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return `${environment.VITE_SUPABASE_URL}${environment.VITE_SUPABASE_BUCKET}${data.path}`;
      }),
      catchError((err) => {
        throw new Error(err.message || 'An error occurred during file upload.');
      })
    );
  }
}
