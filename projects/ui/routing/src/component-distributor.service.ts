import { Component, Inject, Injectable, Optional, Type } from '@angular/core';
import { ComponentRoute, COMPONENT_ROUTES } from './component-routes.token';

@Component({
  selector: 'purp-no-content',
  template: `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:3rem;color:#666;text-align:center;">
      <p style="font-size:1rem;margin:0;">Nenhum conteúdo disponível para esta página.</p>
    </div>
  `,
  imports: [],
  standalone: true,
})
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
