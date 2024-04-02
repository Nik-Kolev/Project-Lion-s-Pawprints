import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorComponent } from './core/error/error.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { InfoContactsComponent } from './info-contacts/info-contacts.component';

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
    path: 'blog',
    loadComponent: () =>
      import('./blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'info-contacts',
    component: InfoContactsComponent,
  },
  {
    path: 'catalogSafari',
    loadComponent: () =>
      import('./safaris/catalog-safari/catalog-safari.component').then(
        (m) => m.CatalogSafariComponent
      ),
  },
  {
    path: 'safari/:safariId',
    loadComponent: () =>
      import('./safaris/display-safari/display-safari.component').then(
        (m) => m.DisplaySafariComponent
      ),
  },
  {
    path: 'createSafari',
    loadComponent: () =>
      import('./safaris/create-edit-safari/create-edit-safari.component').then(
        (m) => m.CreateEditSafariComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'editSafari/:safariId',
    loadComponent: () =>
      import('./safaris/create-edit-safari/create-edit-safari.component').then(
        (m) => m.CreateEditSafariComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
