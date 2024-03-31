import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (
    localStorage.getItem('user') &&
    localStorage.getItem('user').admin == true
  ) {
    return true;
  }

  router.navigate(['/']);
  toastr.error('Permit Needed. Explore Elsewhere!');
  return false;
};
