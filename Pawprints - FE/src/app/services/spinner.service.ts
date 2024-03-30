import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner$$ = new BehaviorSubject<boolean>(false);
  public spinner$ = this.spinner$$.asObservable();

  changeLoadingState(state: boolean) {
    this.spinner$$.next(state);
  }
}
