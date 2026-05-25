import { InjectionToken, Type } from '@angular/core';

export interface ComponentRoute {
  route_id: string;
  component: () => Promise<Type<any>>;
}

export const COMPONENT_ROUTES = new InjectionToken<ComponentRoute[]>('COMPONENT_ROUTES');
