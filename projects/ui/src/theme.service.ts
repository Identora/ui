import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ThemeUrl {
  name: string;
  href: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem('theme');
        if (stored) this.setTheme(stored);
        else this.setTheme(this.current.name);
      } catch (e) {}

      this.document.body.setAttribute('cds-theme', this.current.name);
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.theme.value.href;
      this.document.querySelector('head')!.appendChild(this.linkRef);
    }
  }

  public linkRef: HTMLLinkElement | any;

  private dark = 'assets/css/clr-ui-dark.css';
  private light = 'assets/css/clr-ui.css';

  public theme: BehaviorSubject<ThemeUrl> = new BehaviorSubject({ name: 'light', href: this.light });

  get current(): ThemeUrl { return this.theme.value; }

  setTheme(theme: string) {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      this.theme.next({ name: 'dark', href: this.dark });
      this.document.body.setAttribute('cds-theme', 'dark');
      this.linkRef.href = this.dark;
    } else {
      localStorage.setItem('theme', 'light');
      this.theme.next({ name: 'light', href: this.light });
      this.document.body.setAttribute('cds-theme', 'light');
      this.linkRef.href = this.light;
    }
  }
}
