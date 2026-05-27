import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { COMPONENT_ROUTES, ComponentRoute } from '@sp1ne/angular/routing';
import { BASE_COMPONENTS } from './base-components';
import { APP_PACKAGE_INFO, PackageInfo } from './tokens';

export interface ShellOptions {
  appComponents?: ComponentRoute[];
  packageInfo?: PackageInfo;
}

export function provideShell(options: ShellOptions = {}): EnvironmentProviders {
  const appComponents = options.appComponents ?? [];
  const baseIds = new Set(BASE_COMPONENTS.map(c => c.route_id));
  const conflicts = appComponents.filter(c => baseIds.has(c.route_id));

  if (conflicts.length > 0) {
    throw new Error(
      `[provideShell] Conflicting route_ids with BASE_COMPONENTS: ${conflicts.map(c => c.route_id).join(', ')}`
    );
  }

  return makeEnvironmentProviders([
    { provide: COMPONENT_ROUTES, useValue: [...BASE_COMPONENTS, ...appComponents] },
    ...(options.packageInfo ? [{ provide: APP_PACKAGE_INFO, useValue: options.packageInfo }] : []),
  ]);
}
