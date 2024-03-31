import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DisplaySafariComponent } from './safaris/display-safari/display-safari.component';
import { CreateSafariComponent } from './safaris/create-safari/create-safari.component';
import { CatalogSafariComponent } from './safaris/catalog-safari/catalog-safari.component';
import { ErrorComponent } from './core/error/error.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'createSafari',
    component: CreateSafariComponent,
    canActivate: [authGuard],
  },
  {
    path: 'catalogSafari',
    component: CatalogSafariComponent,
  },
  {
    path: 'safari/:safariId',
    component: DisplaySafariComponent,
  },
  {
    path: 'editSafari/:safariId',
    component: CreateSafariComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
