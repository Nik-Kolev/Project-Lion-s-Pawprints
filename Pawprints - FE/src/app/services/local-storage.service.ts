import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: {}): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
}
