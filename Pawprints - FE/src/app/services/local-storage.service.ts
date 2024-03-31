import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: User): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): User {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
}
