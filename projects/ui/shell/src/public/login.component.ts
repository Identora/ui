import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService, ViewService } from '@cl4im/angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  template: ``
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthorizationService,
    private view: ViewService
  ) {}

  ngOnInit(): void { this.bootstrap(); }

  async bootstrap() {
    await this.auth.reauthorize();
    if (this.auth.authenticated) {
      const views = await this.view.update(this.auth.getToken());
      const firstRoute = views?.routes?.[0]?.route_redirect ?? '/home';
      this.router.navigate([firstRoute]);
    }
  }
}
