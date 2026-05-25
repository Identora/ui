import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AUTH_CONFIG, AuthConfig, AuthorizationService } from '@identora/auth/core';

@Component({
  selector: 'app-callback',
  imports: [],
  template: ``,
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthorizationService,
    @Inject(AUTH_CONFIG) private config: AuthConfig
  ) { this.handleCallback(); }

  async handleCallback() {
    const code  = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
    const error = this.route.snapshot.queryParamMap.get('error');

    if (window !== window.parent) {
      window.parent.postMessage(
        { type: 'silent_callback', code, state, error },
        window.location.origin
      );
      return;
    }

    if (error) { console.error('[callback] auth error:', error); return; }

    const storedState = sessionStorage.getItem('oidc_state');
    const verifier    = sessionStorage.getItem('pkce_code_verifier');

    if (!code || state !== storedState || !verifier) {
      console.error('[callback] parâmetros inválidos');
      return;
    }

    await this.auth.token({
      grant_type:    'authorization_code',
      code:          code,
      redirect_uri:  this.config.redirectUrl,
      client_id:     this.config.clientId,
      code_verifier: verifier,
    });
  }
}
