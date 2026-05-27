import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewService } from '@identora/auth/core';
import { ClaritySharedModule, Route } from '@identora/ui';
import { LoggerService } from '../logger.service';
import { ComponentDistributorService } from '../component-distributor.service';

@Component({
  imports: [CommonModule, ClaritySharedModule],
  selector: 'app-component-factory',
  template: `
    <div *ngIf="loading" style="display:flex;justify-content:center;padding:2rem;">
      <clr-spinner>Loading...</clr-spinner>
    </div>
    <ng-container #componentFactory></ng-container>
  `,
})
export class ComponentFactoryComponent {

  @ViewChild('componentFactory', { read: ViewContainerRef })
  private componentFactory!: ViewContainerRef;

  @Input() route!: Route;

  public loading = false;

  private componentBuilded!: ComponentRef<unknown> | null;
  private routerEvents!: Subscription;

  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private viewService: ViewService,
    private componentDistributorService: ComponentDistributorService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.loadComponent();
    this.routerEvents = this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationEnd) await this.loadComponent();
    });
  }

  ngOnDestroy() {
    this.routerEvents?.unsubscribe();
    this.componentBuilded?.destroy();
  }

  async loadComponent() {
    this.componentBuilded?.destroy();
    this.componentFactory?.clear();
    this.componentBuilded = null;

    const logControl = this.loggerService.logger;
    const logEntry = logControl[logControl.length - 1];
    const route_id = logEntry?.route_id;

    if (!route_id) return;

    this.loading = true;
    this.cdr.detectChanges();

    const component = await this.componentDistributorService.getComponent(route_id);

    this.loading = false;
    this.cdr.detectChanges();

    try {
      this.componentBuilded = this.componentFactory.createComponent(component);
    } catch (err) {
      console.error(err);
    }
  }
}
