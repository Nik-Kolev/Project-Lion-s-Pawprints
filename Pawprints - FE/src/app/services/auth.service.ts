import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

const { apiURL } = environment;

interface User {
  email: string;
  password: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();
  user: User | undefined;

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  register(email: string, password: string) {
    return this.http
      .post<User>(`${apiURL}/users/register`, { email, password })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          this.storage.setItem('user', user);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(
        `${apiURL}/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          this.storage.setItem('user', user);
        })
      );
  }

  logout(): void {
    this.http
      .post<User>(`${apiURL}/users/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.user$$.next(undefined);
          this.storage.deleteItem('user');
        })
      )
      .subscribe({
        complete: () => console.log('Logout request completed'),
        error: (error) => console.error('Logout request failed', error),
      });
  }
}
