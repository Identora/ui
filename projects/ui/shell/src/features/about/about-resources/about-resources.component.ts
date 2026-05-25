import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaritySharedModule } from '@identora/ui';
import { APP_PACKAGE_INFO, PackageInfo } from '../../../tokens';

@Component({
  selector: 'about-resources',
  imports: [CommonModule, ClaritySharedModule],
  templateUrl: './about-resources.component.html',
  styleUrl: './about-resources.component.scss'
})
export class AboutResourcesComponent implements OnInit {
  public packagejson: PackageInfo = {};

  constructor(@Optional() @Inject(APP_PACKAGE_INFO) private packageInfo: PackageInfo | null) {}

  ngOnInit() {
    this.packagejson = this.packageInfo ?? {};
  }
}
