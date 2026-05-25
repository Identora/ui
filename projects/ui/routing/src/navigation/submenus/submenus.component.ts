import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ClaritySharedModule, Route } from '@identora/ui';

@Component({
  selector: 'app-submenus',
  imports: [CommonModule, ClaritySharedModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './submenus.component.html',
})
export class SubmenuComponent implements OnInit {

  @Input() routed!: Route;
  @Input() router: any;
  @Input() loading!: Boolean;

  activeSubmenu: any;

  ngOnInit(): void {}

  setActive(submenu: any) { this.activeSubmenu = submenu; }
}
