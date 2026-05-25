import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthorizationService } from '@identora/auth/core';

@Component({
  selector: 'loggedout',
  imports: [CommonModule],
  templateUrl: './loggedout.component.html',
  styleUrl: './loggedout.component.scss'
})
export class LoggedOutComponent {
  constructor(private authorizationService: AuthorizationService) {}
  goToLogin() { this.authorizationService.authorize(); }
}
