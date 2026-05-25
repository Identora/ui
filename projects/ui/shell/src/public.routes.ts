import { Routes } from '@angular/router';
import { CallbackComponent } from './public/callback.component';
import { LoggedOutComponent } from './public/loggedout/loggedout.component';
import { LoginComponent } from './public/login.component';

export const PUBLIC_ROUTES: Routes = [
  { path: 'login',    component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'logoff',   component: LoggedOutComponent },
  { path: '',         redirectTo: 'login', pathMatch: 'full' },
];
