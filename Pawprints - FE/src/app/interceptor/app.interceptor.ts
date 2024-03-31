import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { environment } from '../../environments/environment';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  req = req.clone({
    withCredentials: true,
  });

  if (req.url.startsWith(`${environment.apiURL}/safari/fetchCatalogSafaris`)) {
    spinnerService.changeLoadingState(true);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
        case 403:
          toastr.error(error.error.error);
          router.navigate(['/login']);
          break;
        default:
          toastr.error('Oops, something went wrong.');
          router.navigate(['/']);
          break;
      }
      return throwError(() => error);
    }),
    finalize(() => {
      spinnerService.changeLoadingState(false);
    })
  );
};
