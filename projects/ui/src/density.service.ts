import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DensitySetting {
  name: 'default' | 'regular' | 'compact';
}

@Injectable({ providedIn: 'root' })
export class DensityService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem('density');
        if (stored) this.setDensity(stored as DensitySetting['name']);
        else this.setDensity(this.current.name);
      } catch (e) {}

      this.document.body.setAttribute('clr-density', this.current.name);
    }
  }

  public density: BehaviorSubject<DensitySetting> =
    new BehaviorSubject<DensitySetting>({ name: 'regular' });

  get current(): DensitySetting { return this.density.value; }

  setDensity(density: string) {
    const valid: DensitySetting['name'][] = ['default', 'regular', 'compact'];
    const selected = valid.includes(density as any)
      ? (density as DensitySetting['name'])
      : 'regular';

    localStorage.setItem('density', selected);
    this.density.next({ name: selected });
    this.document.body.setAttribute('clr-density', selected);
  }

  toggleDensity() {
    const order: DensitySetting['name'][] = ['default', 'regular', 'compact'];
    const current = this.current.name;
    const next = order[(order.indexOf(current) + 1) % order.length];
    this.setDensity(next);
  }
}
