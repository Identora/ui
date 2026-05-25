import { Route } from '@angular/router';
import { ViewGuard } from '@identora/ui/routing';

export const multipageRouter: Route[] = [
  {
    path: ':page',
    loadComponent: () => import('@identora/ui/routing').then(m => m.MultipageRouterComponent),
    canActivate: [ViewGuard],
  },
];

export const submenuRouter: Route[] = [
  {
    path: ':submenu',
    loadComponent: () => import('@identora/ui/routing').then(m => m.SubmenuRouterComponent),
    canActivate: [ViewGuard],
    children: [...multipageRouter],
  },
];

export const itemRouter: Route[] = [
  {
    path: ':item',
    loadComponent: () => import('@identora/ui/routing').then(m => m.ItemRouterComponent),
    canActivate: [ViewGuard],
    children: [...submenuRouter],
  },
];

export const menuRouter: Route[] = [
  {
    path: ':menu',
    loadComponent: () => import('@identora/ui/routing').then(m => m.MenuRouterComponent),
    canActivate: [ViewGuard],
    children: [...itemRouter],
  },
];

export const navigationRouter: Route[] = [
  {
    path: ':navigation',
    loadComponent: () => import('@identora/ui/routing').then(m => m.NavigationRouterComponent),
    canActivate: [ViewGuard],
    children: [...menuRouter],
  },
];

export const headerRouter: Route[] = [
  {
    path: ':header',
    loadComponent: () => import('@identora/ui/routing').then(m => m.HeaderRouterComponent),
    canActivate: [ViewGuard],
    children: [...navigationRouter],
  },
];
