import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Type } from '@angular/core';
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

    <div *ngIf="error" class="error-wrapper">
      <h3>Erro fatal ao carregar componente</h3>
      <p>Verifique o console para detalhes.</p>
      {{message}}
    </div>

    <ng-container #componentFactory></ng-container>
  `,
  styles: [`.error-wrapper { padding: 1rem; }`],
})
export class ComponentFactoryComponent {

  @ViewChild('componentFactory', { read: ViewContainerRef })
  private componentFactory!: ViewContainerRef;

  @Input() route!: Route;

  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private viewService: ViewService,
    private componentDistributorService: ComponentDistributorService,
    private cdr: ChangeDetectorRef,
  ) {}

  public loading = true;
  public error = false;
  public message: string | null = null;

  private componentBuilded!: ComponentRef<unknown> | null;
  private routerEvents!: Subscription;

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

    const logControl = this.loggerService.logger;
    const logEntry = logControl[logControl.length - 1];

    if (logEntry?.route_id) {
      this.loading = true;
    }

    this.loading = false;
    this.cdr.detectChanges();

    const route_id = logEntry?.route_id;
    if (!route_id) return;

    const component = await this.componentDistributorService.getComponent(route_id);

    try {
      this.componentBuilded = this.componentFactory.createComponent(component);
    } catch (err) {
      console.error(err);
    }
  }

  getInputs(component: Type<any>): string[] {
    return Object.keys((component as any).ɵcmp.inputs);
  }
}
