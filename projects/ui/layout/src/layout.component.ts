import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'purp-layout',
  imports: [HeaderComponent, SidebarComponent, NavigationComponent],
  template: `
    <div class="main-container">
      <purp-header></purp-header>
      <div class="content-container">
        <purp-sidebar class="sidebar"></purp-sidebar>
        <div class="content-area">
          <purp-navigation></purp-navigation>
        </div>
      </div>
    </div>
  `,
})
export class LayoutComponent {}
