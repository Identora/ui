import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClaritySharedModule, Route } from '@sp1ne/angular';
import { ViewService } from '@cl4im/angular/core';

@Component({
  selector: 'purp-sidebar',
  imports: [CommonModule, ClaritySharedModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: [`clr-vertical-nav { height: 100% }`],
})
export class SidebarComponent implements OnInit, OnDestroy {

  public menus: Route[] = [];
  public docs: Route[] = [];
  public loading = true;
  private show: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private viewService: ViewService,
  ) {}

  ngOnInit(): void {
    this.show = this.viewService.logControl$.subscribe(logControl => {
      if (!logControl) {
        this.menus = [];
        this.loading = false;
        return;
      }
      const found = logControl.findIndex(r => r.route_type === 'navigation');
      this.menus = found !== -1 ? (logControl[found]?.routes ?? []) : [];
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.show.unsubscribe();
  }
}
