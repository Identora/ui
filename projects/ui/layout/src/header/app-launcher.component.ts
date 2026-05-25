import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppDef, AuthorizationService, RealmAppsService } from '@identora/auth/core';
import { ClaritySharedModule } from '@identora/ui';

@Component({
  selector: 'purp-app-launcher',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './app-launcher.component.html',
  styleUrl: './app-launcher.component.scss',
})
export class AppLauncherComponent implements OnInit {

  public apps: AppDef[] = [];
  public loading = false;

  constructor(
    private authService: AuthorizationService,
    private realmAppsService: RealmAppsService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const token = this.authService.getToken();
    const currentOrigin = window.location.origin;
    const all = await this.realmAppsService.getApplications(token);
    this.apps = all.filter(app => app.app_url !== currentOrigin);
    this.loading = false;
  }

}
