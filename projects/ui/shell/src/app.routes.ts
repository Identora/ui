import { Routes } from '@angular/router';
import { PrivateGuard } from '@cl4im/angular/core';
import { LayoutComponent } from '@sp1ne/angular/layout';
import { PRIVATE_ROUTES } from './private.routes';
import { PUBLIC_ROUTES } from './public.routes';

export const APP_ROUTES: Routes = [
  ...PUBLIC_ROUTES,
  {
    path: '',
    component: LayoutComponent,
    canActivate: [PrivateGuard],
    canActivateChild: [PrivateGuard],
    children: PRIVATE_ROUTES,
  },
  { path: '**', redirectTo: '' },
];
