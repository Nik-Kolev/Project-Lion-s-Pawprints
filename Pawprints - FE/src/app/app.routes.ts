import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DisplaySafariComponent } from './safaris/display-safari/display-safari.component';
import { CreateSafariComponent } from './safaris/create-safari/create-safari.component';
import { CatalogSafariComponent } from './safaris/catalog-safari/catalog-safari.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'createSafari',
    component: CreateSafariComponent,
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
  },
];
