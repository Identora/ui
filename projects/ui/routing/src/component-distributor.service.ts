import { Component, Inject, Injectable, Optional, Type } from '@angular/core';
import { ComponentRoute, COMPONENT_ROUTES } from './component-routes.token';

@Component({ selector: 'purp-no-content', template: '' })
class NoContentComponent {}

@Injectable({ providedIn: 'root' })
export class ComponentDistributorService {

  private components: ComponentRoute[];

  constructor(@Optional() @Inject(COMPONENT_ROUTES) routes: ComponentRoute[] | null) {
    this.components = routes ?? [];
  }

  async getComponent(route_id: string): Promise<Type<any>> {
    const entry = this.components.find(c => c.route_id === route_id);
    if (!entry) return NoContentComponent;
    try {
      return await entry.component();
    } catch (err) {
      console.error(`Erro ao carregar componente para ${route_id}:`, err);
      return NoContentComponent;
    }
  }
}
