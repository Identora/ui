import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { ViewService } from '@identora/auth/core';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class ViewGuard implements CanActivate {
  constructor(
    private router: Router,
    private viewService: ViewService,
    private loggerService: LoggerService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRoute(state.url, route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRoute(state.url, route);
  }

  canLoad(route: Route): boolean {
    const fakeSnapshot: any = { data: {} };
    return this.checkRoute('/' + (route.path || ''), fakeSnapshot);
  }

  private checkRoute(url: string, snapshot: any): boolean {
    const view = this.viewService.currentView as any;

    if (view == null) return false;

    const currentRoutes: any[] = Array.isArray(view) ? view : (view?.routes ?? []);

    if (!currentRoutes.length) {
      this.router.navigate(['/no-permission']);
      return false;
    }

    const levels = this.viewService.getLevel(url);
    const routeHierarchy: any[] = [{ routes: currentRoutes }];

    for (let level = 1; level <= levels; level++) {
      const urlAtLevel = this.viewService.getUrlAtLevel(url, level);
      const parent = routeHierarchy[level - 1];
      const found = parent?.routes?.find((r: any) => r.route_redirect === urlAtLevel);

      if (!found) {
        const fallback = parent?.route_redirect || '/home';
        this.router.navigate([fallback]);
        return false;
      }

      routeHierarchy[level] = found;

      if (level === levels) {
        snapshot.data = { logControl: routeHierarchy };
        this.viewService.updateBreadcrumb(routeHierarchy);
        this.loggerService.setLogger(routeHierarchy);
      }
    }

    return true;
  }
}
