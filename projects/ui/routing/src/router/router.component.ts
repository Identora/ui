import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewService } from '@identora/auth/core';
import { Route } from '@identora/ui';
import { LoggerService } from '../logger.service';
import { SubmenuComponent } from '../navigation/submenus/submenus.component';
import { MultipagesComponent } from '../navigation/multipages/multipages.component';
import { ComponentFactoryComponent } from '../component-factory/component-factory.component';

const ROUTER_IMPORTS = [
  CommonModule,
  RouterOutlet,
  SubmenuComponent,
  MultipagesComponent,
  ComponentFactoryComponent,
] as const;

@Component({
  selector: 'router',
  imports: [...ROUTER_IMPORTS],
  templateUrl: './router.component.html',
})
export class RouterComponent implements OnInit, OnDestroy {
  protected router = inject(Router);
  protected loggerService = inject(LoggerService);
  protected viewService = inject(ViewService);

  protected routeLevel = 0;

  public loading = true;
  public routed: Route | null = null;
  public logControl: any;
  public routerVerifier: Subscription = new Subscription();

  ngOnInit(): void {
    this.updateViewState();
    this.routerVerifier = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) this.updateViewState();
    });
  }

  ngOnDestroy(): void {
    this.routerVerifier?.unsubscribe();
  }

  protected updateViewState() {
    this.logControl = this.loggerService.logger;
    this.routed = this.logControl[this.routeLevel];

    const url = this.viewService.getUrlAtLevel(this.router.url, this.routeLevel);
    const level = this.viewService.getLevel(this.router.url);

    if (
      this.routed &&
      this.routed.routes &&
      this.routed.routes.length > 0 &&
      this.routed.route_redirect === url &&
      level === this.routeLevel
    ) {
      this.router.navigate([this.routed.routes[0].route_redirect]);
    }

    this.loading = false;
  }
}

@Component({ selector: 'app-header-router',     templateUrl: './router.component.html', imports: [...ROUTER_IMPORTS] })
export class HeaderRouterComponent extends RouterComponent { protected override routeLevel = 1; }

@Component({ selector: 'app-navigation-router', templateUrl: './router.component.html', imports: [...ROUTER_IMPORTS] })
export class NavigationRouterComponent extends RouterComponent { protected override routeLevel = 2; }

@Component({ selector: 'app-menu-router',       templateUrl: './router.component.html', imports: [...ROUTER_IMPORTS] })
export class MenuRouterComponent extends RouterComponent { protected override routeLevel = 3; }

@Component({ selector: 'app-item-router',       templateUrl: './router.component.html', imports: [...ROUTER_IMPORTS] })
export class ItemRouterComponent extends RouterComponent { protected override routeLevel = 4; }

@Component({ selector: 'app-submenu-router',    templateUrl: './router.component.html', imports: [...ROUTER_IMPORTS] })
export class SubmenuRouterComponent extends RouterComponent { protected override routeLevel = 5; }

@Component({ selector: 'app-multipage-router',  templateUrl: './router.component.html', imports: [...ROUTER_IMPORTS] })
export class MultipageRouterComponent extends RouterComponent { protected override routeLevel = 6; }
