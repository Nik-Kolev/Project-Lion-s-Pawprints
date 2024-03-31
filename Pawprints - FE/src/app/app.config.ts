import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './interceptor/app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([appInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      closeButton: true,
    }),
    BrowserAnimationsModule,
    provideAnimationsAsync(),
  ],
};
