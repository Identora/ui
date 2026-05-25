import { Routes } from '@angular/router';
import { NoRightsComponent } from './templates/no-rights/no-rights.component';
import { headerRouter } from './router.routes';

export const PRIVATE_ROUTES: Routes = [
  { path: 'no-permission', component: NoRightsComponent },
  { path: '', children: headerRouter },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
