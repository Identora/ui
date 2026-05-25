import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadCrumb, ViewService } from '@identora/auth/core';
import { ClaritySharedModule } from '@identora/ui';

@Component({
  selector: 'purp-navigation',
  imports: [ClaritySharedModule, RouterOutlet],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {

  public breadCrumb!: BreadCrumb;
  private breadCrumbListener: Subscription = new Subscription();

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.breadCrumbListener = this.viewService.breadCrumb$.subscribe(
      data => this.breadCrumb = data
    );
  }

  ngOnDestroy(): void { this.breadCrumbListener.unsubscribe(); }
}
