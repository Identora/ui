import { InjectionToken } from '@angular/core';

export interface PackageInfo {
  name?: string;
  version?: string;
  description?: string;
  license?: string;
  buildDate?: string;
  environment?: string;
  repository?: { url?: string };
  developer?: { name?: string; homepage?: string; email?: string };
  docs?: string;
  issues?: string;
  dependencies?: Record<string, string>;
  [key: string]: any;
}

export const APP_PACKAGE_INFO = new InjectionToken<PackageInfo>('APP_PACKAGE_INFO');
