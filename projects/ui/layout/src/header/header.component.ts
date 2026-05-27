import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppDef, AuthorizationService, RealmAppsService, ViewService } from '@identora/auth/core';
import { ClaritySharedModule, DensityService, Route, ThemeService, ThemeUrl } from '@identora/ui';

@Component({
  selector: 'purp-header',
  imports: [CommonModule, ClaritySharedModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  public theme!: ThemeUrl;
  public isFullscreen = !!document.fullscreenElement;
  public element = document.documentElement;
  public headerBlocked = false;
  public headers: Route[] = [];
  public apps: AppDef[] = [];

  constructor(
    private authService: AuthorizationService,
    private themeService: ThemeService,
    private densityService: DensityService,
    private viewService: ViewService,
    private realmAppsService: RealmAppsService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.theme = this.themeService.current;
    this.updateView(this.viewService.currentView);
    this.viewService.currentView$.subscribe((data: any) => this.updateView(data));

    const token = this.authService.getToken();
    const currentOrigin = window.location.origin;
    const all = await this.realmAppsService.getApplications(token);
    this.apps = all.filter(app => app.app_url !== currentOrigin);
  }

  updateView(data: any) {
    this.headers = data?.routes ?? [];
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.theme = this.themeService.current;
  }

  setDensity() { this.densityService.toggleDensity(); }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.element.requestFullscreen()
        .then(() => { this.isFullscreen = true; })
        .catch(err => console.error(`Erro ao ativar tela cheia: ${err.message}`));
    } else {
      document.exitFullscreen()
        .then(() => { this.isFullscreen = false; })
        .catch(err => console.error(`Erro ao sair da tela cheia: ${err.message}`));
    }
  }

  logout() { this.authService.logout(); }
}
