import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { environment } from '../environments/environment';
import { finalize } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  req = req.clone({
    withCredentials: true,
  });

  if (req.url.startsWith(`${environment.apiURL}/safari/fetchCatalogSafaris`)) {
    spinnerService.changeLoadingState(true);
  }

  return next(req).pipe(
    finalize(() => {
      spinnerService.changeLoadingState(false);
    })
  );
};
