import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

export const guestGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (localStorage.getItem('user') != null) {
    router.navigate(['/']);
    toastr.error('Already Logged In. Explore elsewhere!');
    return false;
  }
  return true;
};
