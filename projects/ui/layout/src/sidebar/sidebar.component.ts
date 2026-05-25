import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClaritySharedModule, Route } from '@identora/ui';

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.show.unsubscribe();
  }
}
