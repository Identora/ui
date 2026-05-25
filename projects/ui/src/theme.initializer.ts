import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ThemeService } from './theme.service';

export const THEME_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: (theme: ThemeService) => () => {},
  deps: [ThemeService],
  multi: true,
};

export function provideUi(): EnvironmentProviders {
  return makeEnvironmentProviders([THEME_INITIALIZER]);
}
